import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';
// Only a CI build entry point. Production build/start commands are unchanged.
for(const name of ['.env','.env.local','.env.production','.env.production.local'])if(fs.existsSync(name))throw Error('CI build refuses '+name);
const env={...process.env,NEXT_TELEMETRY_DISABLED:'1'};
for(const name of Object.keys(env))if(/SUPABASE|DATABASE_URL|POSTGRES/i.test(name))delete env[name];
const tokenquest=JSON.parse(fs.readFileSync('package.json')).name.includes('tokenquest');
let server;
if(tokenquest){
 const tables=new Set(['tokenquest_site_pages','tokenquest_blog_posts','tokenquest_authors','tokenquest_categories']);
 server=http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname.split('/').at(-1);if(req.method!=='GET'||!tables.has(name)){res.writeHead(403);res.end();return;}res.setHeader('Content-Type','application/json');res.end(JSON.stringify(name==='tokenquest_site_pages'?[{path:'/privacy-policy',title:'CI fixture policy',description:'Synthetic build content only',html:'<header>CI fixture</header><h2>Test policy</h2><p>Synthetic content, not a published policy.</p>'}]:[]));});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 env.SUPABASE_URL='http://127.0.0.1:'+server.address().port;env.SUPABASE_PUBLISHABLE_KEY='ci-fixture-not-a-real-key';
 console.log('Build uses empty synthetic CMS collections on loopback; published article rendering is outside this build check.');
}
try{const pkg=JSON.parse(fs.readFileSync('package.json'));const args=['node_modules/next/dist/bin/next','build'];if(pkg.scripts.build.includes('--webpack'))args.push('--webpack');const child=spawn(process.execPath,args,{env,stdio:'inherit'});const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});process.exitCode=code??1;}finally{if(server)await new Promise(resolve=>server.close(resolve));}
