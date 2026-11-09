// Derivate tehnice din logo-ul aprobat: decupare, redimensionare și compresie.
// Nu redesenează marca și nu înlocuiește literele sau simbolul furnizat.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const brand = new URL("../public/brand/", import.meta.url);
await mkdir(brand, {recursive:true});
const original = await readFile(new URL("../assets/brand/contab-original.jpg",import.meta.url));
const logo = await sharp(original).extract({left:450,top:406,width:424,height:125}).png().toBuffer();
const mark = await sharp(original).extract({left:458,top:413,width:111,height:111}).png().toBuffer();
await writeFile(new URL("contab-logo.png",brand),logo);
await writeFile(new URL("contab-logo.webp",brand),await sharp(logo).webp({quality:95}).toBuffer());
for(const width of [160,268,320,424]) await writeFile(new URL(`contab-logo-${width}.webp`,brand),await sharp(logo).resize({width}).webp({quality:95}).toBuffer());
await writeFile(new URL("contab-mark.png",brand),mark);
await writeFile(new URL("contab-mark.webp",brand),await sharp(mark).webp({quality:95}).toBuffer());
for(const size of [48,96,192,512]) await writeFile(new URL(`contab-icon-${size}.png`,brand),await sharp(mark).resize(size,size).png().toBuffer());
await writeFile(new URL("../public/apple-touch-icon.png",import.meta.url),await sharp(mark).resize(180,180).png().toBuffer());
const wordmark = await sharp(logo).resize({width:420}).png().toBuffer();
const square = await sharp({create:{width:512,height:512,channels:3,background:"white"}}).composite([{input:wordmark,gravity:"centre"}]).png().toBuffer();
await writeFile(new URL("contab-logo-square.png",brand),square);
const socialLogo = await sharp(logo).resize({width:660}).png().toBuffer();
const social = await sharp({create:{width:1200,height:630,channels:3,background:"white"}}).composite([{input:socialLogo,gravity:"centre"}]).png().toBuffer();
await writeFile(new URL("contab-social-20261104.png",brand),social);
// Păstrăm funcțional și URL-ul imaginii sociale din versiunile anterioare.
await writeFile(new URL("../public/opengraph-image.png",import.meta.url),social);
const sizes=[16,32,48];
const pngs=await Promise.all(sizes.map(size=>sharp(mark).resize(size,size).png().toBuffer()));
const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);
let offset=header.length;
pngs.forEach((png,i)=>{const p=6+16*i;header[p]=sizes[i];header[p+1]=sizes[i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(png.length,p+8);header.writeUInt32LE(offset,p+12);offset+=png.length;});
await writeFile(new URL("../public/favicon.ico",import.meta.url),Buffer.concat([header,...pngs]));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111 111"><image width="111" height="111" href="data:image/png;base64,${mark.toString('base64')}"/></svg>`;
await writeFile(new URL("../src/app/icon.svg",import.meta.url),svg);
console.log("Logo Contab: wordmark, favicon, apple-touch, Organization și Open Graph 1200×630 generate din sursa aprobată.");
