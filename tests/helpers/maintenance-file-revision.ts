import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { getArticle } from '../../src/data/articles';
import { assertAuditedRevision, assertAuditedMetadataRevision } from './editorial-revision';

/** Historical file changes require exact hashes and the corresponding dated audit. */
export function assertDocumentedMaintenanceFileRevision(file:string,historicalHash:string):boolean {
 const index=JSON.parse(readFileSync('docs/research/maintenance/index.json','utf8'));
 const transitions=index.revisionFiles.flatMap((auditFile:string)=>{
  const record=dirname(auditFile)+'/file-transitions.json';
  return existsSync(record)?JSON.parse(readFileSync(record,'utf8')):[];
 });
 const sha=(text:string)=>createHash('sha256').update(text).digest('hex');
 const raw=readFileSync(file,'utf8');const normalized=raw.replaceAll('\r\n','\n');
 // Git checkout/revert may change CRLF only; all other bytes remain protected.
 if([sha(raw),sha(normalized),sha(normalized.replaceAll('\n','\r\n'))].includes(historicalHash))return true;
 const current=sha(normalized);
 let cursor=historicalHash;const seen=new Set<string>();let followed=false;
 while(cursor!==current){
  if(seen.has(cursor))throw Error('File revision cycle: '+file);seen.add(cursor);
  const candidates=transitions.filter((r:any)=>r.file===file&&[r.beforeSha256Lf,r.beforeSha256CrLf].includes(cursor));
  if(!candidates.length){if(!followed)return false;throw Error('Incomplete file revision: '+file);}
  assert.equal(candidates.length,1,file);const row=candidates[0];followed=true;
  if(file.startsWith('src/data/content/')){
   const slug=file.split('/').at(-1)!.replace(/\.ts$/,'');const article=getArticle(slug)!;
   const audit=JSON.parse(readFileSync(row.revisionFile,'utf8')).articles.find((a:any)=>a.slug===slug);
   assert.ok(audit,slug);assertAuditedRevision(article,audit.beforeContentSha256);assertAuditedMetadataRevision(article,audit.beforeMetadataSha256);
  }
  cursor=row.afterSha256Lf;
 }
 return followed;
}
