import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import dns from 'node:dns';
import dnsPromises from 'node:dns/promises';
import {gzipSync} from 'node:zlib';
const require=createRequire(import.meta.url);
const optimizerPath=require.resolve('next/dist/server/image-optimizer');
const guardPath=require.resolve('next/dist/server/is-private-ip');
const {imageConfigDefault}=require('next/dist/shared/lib/image-config');
const actualGuard=require(guardPath);
const MAX_BODY=1024*1024;

test('default image policy accepts local assets and refuses remote/encoded sources',()=>{
 const {ImageOptimizerCache}=require(optimizerPath);
 const config={images:{...imageConfigDefault}};
 const validate=url=>ImageOptimizerCache.validateParams({headers:{}},{url,w:'640',q:'75'},config,false);
 const local=validate('/assets/689654dff7a7a15662908add_relume-190249-p-500.png');
 assert.equal(local.isAbsolute,false);
 for(const url of ['https://image-fixture.invalid/image.png','http://127.0.0.1/image.png','http://[::1]/image.png','//image-fixture.invalid/image.png','%2F%2Fimage-fixture.invalid/image.png'])assert.ok(validate(url).errorMessage,url);
});

test('framework pins the validated DNS answer and preserves image/redirect/gzip responses',async()=>{
 // Synthetic dependency-level regression, not evidence of Titan exploitability.
 // Only this fixture's loopback address is classified as approved. No application
 // setting changes, remote sockets, or real DNS lookups are allowed by this test.
 const oldPromiseLookup=dnsPromises.lookup;
 const oldSocketLookup=dns.lookup;
 const oldOptimizer=require.cache[optimizerPath];
 const guardModule=require.cache[guardPath];
 const oldGuard=guardModule.exports;
 const image=Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);
 let validationLookups=0,socketLookups=0,hits=0;
 const server=createServer((req,res)=>{
   hits++;
   if(req.url==='/redirect'){res.writeHead(302,{location:'/image'});res.end();return;}
   res.writeHead(200,{'content-type':'image/png',...(req.url==='/gzip'?{'content-encoding':'gzip'}:{})});
   res.end(req.url==='/gzip'?gzipSync(image):image);
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 try{
   dnsPromises.lookup=async hostname=>{
     assert.equal(hostname,'pinned.invalid','Unexpected DNS target');
     validationLookups++;
     return [{address:'127.0.0.1',family:4}];
   };
   dns.lookup=(hostname,options,callback)=>{
     socketLookups++;
     const done=typeof options==='function'?options:callback;
     if(hostname!=='pinned.invalid'){done(new Error('Unexpected socket DNS target'));return;}
     if(options?.all)done(null,[{address:'127.0.0.1',family:4}]);
     else done(null,'127.0.0.1',4);
   };
   guardModule.exports={...oldGuard,isPrivateIp:ip=>ip==='127.0.0.1'?false:actualGuard.isPrivateIp(ip)};
   delete require.cache[optimizerPath];
   const {fetchExternalImage}=require(optimizerPath);
   const base='http://pinned.invalid:'+server.address().port;
   for(const route of ['/image','/redirect','/gzip']){
     const result=await fetchExternalImage(base+route,false,MAX_BODY);
     assert.deepEqual(result.buffer,image);
     assert.equal(result.contentType,'image/png');
   }
   assert.equal(validationLookups,4,'Every request/redirect must validate DNS');
   assert.equal(hits,4,'Legitimate image and redirect requests must reach fixture');
   assert.equal(socketLookups,0,'A second socket DNS lookup bypasses the validated answer');
 }finally{
   dnsPromises.lookup=oldPromiseLookup;dns.lookup=oldSocketLookup;
   guardModule.exports=oldGuard;delete require.cache[optimizerPath];
   if(oldOptimizer)require.cache[optimizerPath]=oldOptimizer;
   server.closeAllConnections();
   await new Promise(resolve=>server.close(resolve));
 }
});

test('framework rejects literal and DNS-resolved private addresses before HTTP',async()=>{
 const oldLookup=dnsPromises.lookup;
 const {fetchExternalImage}=require(optimizerPath);
 try{
   for(const url of ['http://127.0.0.1:1/private','http://[::1]:1/private'])await assert.rejects(fetchExternalImage(url,false,MAX_BODY),error=>error.statusCode===400);
   dnsPromises.lookup=async()=>[{address:'93.184.216.34',family:4},{address:'10.0.0.1',family:4}];
   await assert.rejects(fetchExternalImage('http://mixed-fixture.invalid/private',false,MAX_BODY),error=>error.statusCode===400);
 }finally{dnsPromises.lookup=oldLookup;}
});
