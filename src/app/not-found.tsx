import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({title:"Pagină negăsită",description:"Pagina căutată nu există. Revino la căutarea Contab sau explorează articolele de contabilitate și fiscalitate.",path:"/404",index:false});

export default function NotFound() {
  return (
    <main id="main-content" className="not-found container">
      <p>404</p>
      <h1>Pagina aceasta nu mai este aici.</h1>
      <p>
        Poate linkul este incomplet. Biblioteca și căutarea te pot ajuta să
        găsești ce ai nevoie.
      </p>
      <Link href="/" className="button button-primary">
        <Search size={16} />
        Înapoi la căutare
      </Link>
      <Link href="/articole" className="button">
        <ArrowLeft size={15} />
        Articole
      </Link>
    </main>
  );
}
