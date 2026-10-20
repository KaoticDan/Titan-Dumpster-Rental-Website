import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../../package.json',import.meta.url));
const ts=require('typescript');
// Execute the actual server modules with synthetic environment and backend only.
// No real process environment or network is exposed to code under test.
export function loadServer(file,{env={},fetch=()=>{throw Error('Unexpected network request');},mocks={}}={}){
  const cache=new Map();
  function load(filename){
    const absolute=path.resolve(filename);
    if(cache.has(absolute))return cache.get(absolute).exports;
    const cjsModule={exports:{}};cache.set(absolute,cjsModule);
    const code=ts.transpileModule(fs.readFileSync(absolute,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
    const localRequire=(name)=>{
      if(Object.hasOwn(mocks,name))return mocks[name];
      if(name.startsWith('.'))return load(path.resolve(path.dirname(absolute),name.endsWith('.ts')?name:name+'.ts'));
      return require(name);
    };
    const compiled=new vm.Script('(function(exports,require,module){'+code+'\n})',{filename:absolute});
    compiled.runInNewContext({Request,Response,Headers,URL,fetch,process:{env:{...env}},console})(cjsModule.exports,localRequire,cjsModule);
    return cjsModule.exports;
  }
  return load(file);
}
export const request=(body,headers={})=>new Request('https://website.test/api/form',{method:'POST',headers:{'content-type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
