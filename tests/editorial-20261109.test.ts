import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { articles, getArticle } from '../src/data/articles';
import { updateSelections, UPDATES_REVIEWED_AT } from '../src/data/updates';
import { november9Events } from '../src/data/maintenance-20261109';
import { getUpdates } from '../src/lib/updates';
import { localSearchProvider } from '../src/lib/search';
const dir='docs/research/maintenance/20261109/';
const read=(file:string)=>JSON.parse(readFileSync(dir+file,'utf8'));
const before=read('baseline-281.json');const final=read('final-audits.json');
const sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex');
test('9November: eight exact audited revisions preserve281URLs and all historical publication dates',()=>{
 assert.equal(articles.length,281);assert.equal(new Set(articles.map(a=>a.slug)).size,281);
 assert.equal(final.updatedCount,8);assert.equal(final.addedCount,0);assert.equal(final.articles.length,8);
 for(const old of before.articles){
  const article=getArticle(old.slug)!;assert.ok(article);assert.equal(article.publishedAt,old.publishedAt);
  const{content,...meta}=article;const row=final.articles.find((r:any)=>r.slug===article.slug);
  if(!row){assert.equal(sha(content),old.contentSha256);assert.equal(sha(JSON.stringify(meta)),old.metadataSha256);continue;}
  assert.equal(row.beforeContentSha256,old.contentSha256);assert.equal(row.beforeMetadataSha256,old.metadataSha256);
  assert.equal(sha(content),row.contentSha256);assert.equal(sha(JSON.stringify(meta)),row.metadataSha256);
  assert.equal(sha(readFileSync('src/data/content/'+article.slug+'.ts','utf8').replaceAll('\r\n','\n')),row.sourceFileSha256);
  assert.equal(article.reviewedAt,'2026-11-09');assert.equal(row.tablesAfterSha256,row.tablesBeforeSha256);
  for(const pass of [row.authorAudit,row.verificationAudit]){assert.equal(pass.performedAfterDraft,true);assert.equal(pass.contentSha256,row.contentSha256);assert.deepEqual(pass.unresolved,[]);assert.ok(pass.checks.length>=3);}
 }
 for(const old of [...before.historicalAuditFiles,...before.protectedFiles])assert.equal(sha(readFileSync(old.file)),old.sha256,old.file);
 for(const proof of read('primary-evidence.json').captures)assert.equal(sha(readFileSync(dir+proof.file)),proof.sha256,proof.file);
 for(const example of final.exampleChecks)assert.deepEqual(example.actual,example.expected,example.slug);
});
test('9November: actual event dates order29selections and preserve all previous21exactly',()=>{
 assert.equal(UPDATES_REVIEWED_AT,'2026-11-09');assert.equal(updateSelections.length,29);
 assert.deepEqual(updateSelections.filter(e=>!november9Events.some(n=>n.articleSlug===e.articleSlug)),before.updateSelections);
 const ordered=getUpdates();assert.deepEqual(ordered.map(e=>e.eventDate),ordered.map(e=>e.eventDate).sort().reverse());
 assert.equal(ordered[0].eventDate,'2026-11-06');
 for(const event of november9Events){const a=getArticle(event.articleSlug)!;assert.ok(a.sources.includes(event.sourceId));assert.ok(event.eventDate<a.reviewedAt);assert.ok(localSearchProvider.search(a.title).slice(0,3).some(h=>h.article.slug===a.slug));}
});
test('9November: current scope separates2025assessment, VAT routes and administrative balcony clarification',()=>{
 const du=getArticle('declaratia-unica-pfa')!.content;assert.match(du,/anul 2025/);assert.match(du,/60 de zile de la comunicare/);assert.match(du,/45 de zile/);
 const d311=getArticle('declaratia-d311-tva-cod-anulat')!.content;assert.match(d311,/decizii 190/);assert.match(d311,/integral sau parțial/);assert.match(d311,/D311 autodeclarată/);
 const property=getArticle('impozite-locale-firma-cladire-teren-auto')!.content;assert.match(property,/caracter interpretativ și administrativ/);assert.match(property,/nu stabilește o scutire generală/);
 assert.equal(read('impact-matrix.json').rows.length,281);assert.equal(read('backlog.json').monthlyAuditComplete,false);
 assert.deepEqual(read('backlog.json').resolved,['opanaf-1512-2026','opanaf-1457-2026']);
 for(const row of read('source-access.json'))assert.equal(row.intervalAdvanced,false);
 assert.equal(JSON.parse(readFileSync('docs/research/maintenance/index.json','utf8')).lastCompleteMonthlyAudit,null);
});
