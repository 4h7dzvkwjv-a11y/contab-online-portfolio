import { mkdir, writeFile } from "node:fs/promises";
import { articles } from "../src/data/articles";
import { categories } from "../src/data/categories";
import { articleSeo } from "../src/data/seo-articles";
import { pageSeo } from "../src/data/seo-pages";
import { canonicalUrl, categorySeo, seoTitle } from "../src/lib/seo";

async function main() {
  const rows = [
    ...Object.entries(pageSeo).map(([path,item])=>({url:canonicalUrl(path),type:"pagină",keyword:item.keyword,title:seoTitle(item.title),description:item.description,index:path!=="/cautare"})),
    ...categories.map(c=>({url:canonicalUrl("/categorii/"+c.slug),type:"categorie",keyword:categorySeo[c.slug].keyword,title:seoTitle(categorySeo[c.slug].title),description:categorySeo[c.slug].description,index:true})),
    ...articles.map(a=>({url:canonicalUrl("/articol/"+a.slug),type:"articol",keyword:articleSeo[a.slug]?.[1]??"",title:seoTitle(articleSeo[a.slug]?.[0]??a.title),description:a.excerpt,index:true})),
  ];
  for(const article of articles) if(!articleSeo[article.slug]) throw new Error("Lipsește analiza SEO: "+article.slug);
  if(new Set(rows.map(r=>r.title)).size!==rows.length) throw new Error("Titluri duplicate");
  if(new Set(rows.map(r=>r.keyword)).size!==rows.length) throw new Error("Intenții principale duplicate");
  const directory=new URL("../docs/seo/2026-11-04/",import.meta.url);
  await mkdir(directory,{recursive:true});
  await writeFile(new URL("pagini-cuvinte-cheie.json",directory),JSON.stringify(rows,null,2));
  const csv=(value:string)=>'"'+value.replaceAll('"','""')+'"';
  const lines=[["Pagină","Tip","Întrebare/cuvânt-cheie principal","Titlu SEO","Meta descriere","Indexare"]];
  lines.push(...rows.map(r=>[r.url,r.type,r.keyword,r.title,r.description,r.index?"index, follow":"noindex, follow"]));
  await writeFile(new URL("pagini-cuvinte-cheie.csv",directory),'\uFEFF'+lines.map(row=>row.map(csv).join(';')).join('\r\n'));
  const lengths=rows.map(r=>r.title.length);
  console.log(JSON.stringify({pages:rows.length,indexable:rows.filter(r=>r.index).length,articles:articles.length,uniqueTitles:true,uniquePrimaryQueries:true,titleLength:{min:Math.min(...lengths),max:Math.max(...lengths)},over65:rows.filter(r=>r.title.length>65).map(r=>({title:r.title,length:r.title.length}))}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
