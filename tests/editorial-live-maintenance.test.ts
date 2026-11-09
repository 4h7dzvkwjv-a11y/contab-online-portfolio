import { assertAuditedRevision, assertAuditedMetadataRevision } from "./helpers/editorial-revision";
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { articles, getArticle } from '../src/data/articles';
import { sources } from '../src/data/sources';
import { updateSelections, UPDATES_REVIEWED_AT } from '../src/data/updates';
import { liveMaintenanceEvents } from '../src/data/maintenance-live-20261106';
import { getUpdates } from '../src/lib/updates';
import { localSearchProvider } from '../src/lib/search';
import { headingId } from '../src/lib/format';
const dir='docs/research/maintenance/20261106-live/';
const read=(file:string)=>JSON.parse(readFileSync(dir+file,'utf8'));
const baseline=read('baseline-280.json');const audits=read('final-audits.json');
const sha=(x:string|Buffer)=>createHash('sha256').update(x).digest('hex');
test('live maintenance:281uniqueURLs, three revisions and one distinct new question',()=>{
 assert.equal(articles.length,281);assert.equal(new Set(articles.map(a=>a.slug)).size,281);
 assert.equal(audits.updatedCount,3);assert.equal(audits.addedCount,1);assert.equal(audits.articles.length,4);
 for(const previous of baseline.articles){
  const current=getArticle(previous.slug)!;assert.ok(current);assert.equal(current.publishedAt,previous.publishedAt);
  const {content,...meta}=current;const row=audits.articles.find((r:any)=>r.slug===previous.slug);
  if(!row){assertAuditedRevision(current,previous.contentSha256);assertAuditedMetadataRevision(current,previous.metadataSha256);}
  else{assert.equal(row.beforeContentSha256,previous.contentSha256);assert.equal(row.beforeMetadataSha256,previous.metadataSha256);}
 }
 for(const row of audits.articles){
  const current=getArticle(row.slug)!;const{content,...meta}=current;
  assert.equal(sha(content),row.contentSha256);assert.equal(sha(JSON.stringify(meta)),row.metadataSha256);
  assert.equal(sha(readFileSync('src/data/content/'+row.slug+'.ts','utf8').replaceAll('\r\n','\n')),row.sourceFileSha256);
  for(const audit of [row.authorAudit,row.verificationAudit]){assert.equal(audit.performedAfterDraft,true);assert.equal(audit.contentSha256,row.contentSha256);assert.deepEqual(audit.unresolved,[]);assert.ok(audit.checks.length>=3);}
 }
 for(const example of audits.exampleChecks)assert.deepEqual(example.actual,example.expected,example.slug);
 for(const file of [...baseline.historicalAuditFiles,...baseline.protectedFiles])assert.equal(sha(readFileSync(file.file)),file.sha256,file.file);
});
test('live maintenance: publication dates preserve legislative chronology and all seventeen historical selections',()=>{
 assert.ok(UPDATES_REVIEWED_AT>='2026-11-06');
 const recorded = JSON.parse(readFileSync('docs/research/maintenance/20261109/baseline-281.json','utf8')).updateSelections;
 const historical = updateSelections.filter(e=>recorded.some((old:any)=>old.articleSlug===e.articleSlug));assert.equal(historical.length,21);assert.deepEqual(historical,recorded);
 assert.deepEqual(historical.filter(e=>!liveMaintenanceEvents.some(n=>n.articleSlug===e.articleSlug)),baseline.updateSelections);
 const entries=getUpdates();assert.deepEqual(entries.map(e=>e.eventDate),entries.map(e=>e.eventDate).sort().reverse());
 assert.equal(entries.filter(e=>recorded.some((old:any)=>old.articleSlug===e.articleSlug))[0].eventDate,'2026-11-05');
 for(const event of liveMaintenanceEvents){const article=getArticle(event.articleSlug)!;assert.ok(article.sources.includes(event.sourceId));assert.ok(event.eventDate<article.reviewedAt);}
});
test('live maintenance: new guide remains searchable, linked, and explicit about unavailable workflows',()=>{
 const article=getArticle('lista-ocupatiilor-deficitare-propunere-angajator')!;
 assert.equal(article.category,'salarizare');assert.equal(article.publishedAt,'2026-11-06');
 for(const query of ['Lista ocupațiilor deficitare propunerea firmei termenul de 10 zile','Cum se desfășoară analiza în 10 zile'])assert.ok(localSearchProvider.search(query).slice(0,3).some(h=>h.article.slug===article.slug),query);
 const headings=[...article.content.matchAll(/^## (.+)$/gm)].map(m=>headingId(m[1]));assert.equal(new Set(headings).size,headings.length);
 for(const link of article.content.matchAll(/\]\((\/articol\/[^)#?]+)\)/g))assert.ok(getArticle(link[1].split('/').at(-1)!),link[1]);
 for(const id of article.sources)assert.ok(sources[id]?.url);
 assert.match(article.content,/10 zile calendaristice/);assert.match(article.content,/dezactivarea fluxurilor/);assert.match(article.content,/D\/AM2/);assert.match(article.content,/Pentru cele anterioare se păstrează termenul/);
 assert.match(getArticle('poprire-cont-bancar-anaf-firma')!.content,/5 zile de la primire/);
});
test('live maintenance: fresh evidence is retained; source failures do not advance monthly coverage',()=>{
 const evidence=read('primary-evidence.json');for(const source of evidence.captures)assert.equal(sha(readFileSync(dir+source.file)),source.sha256);
 assert.equal(read('impact-matrix.json').rows.length,280);assert.equal(read('backlog.json').monthlyAuditComplete,false);
 for(const row of read('source-access.json'))assert.equal(row.intervalAdvanced,false);
 assert.equal(JSON.parse(readFileSync('docs/research/maintenance/index.json','utf8')).lastCompleteMonthlyAudit,null);
});
