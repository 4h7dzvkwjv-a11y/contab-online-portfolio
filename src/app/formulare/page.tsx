import type { Metadata } from "next";
import { FormsExplorer } from "@/components/forms-explorer";
import { FormInstructions, FormsVerification } from "@/components/form-instructions";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/formulare"],path:"/formulare"});

export default function FormsPage() {
  return (
    <main id="main-content" className="container forms-page">
      <div className="page-heading forms-page-heading">
        <p className="page-kicker">Bibliotecă de formulare</p>
        <h1>Formulare ANAF și ONRC.</h1>
        <p>Declarații fiscale și documente pentru Registrul Comerțului. Găsește formularul potrivit și descarcă PDF-ul completabil.</p>
      </div>
      <FormsExplorer />
      <div className="forms-page-instructions"><FormInstructions /></div>
      <FormsVerification />
    </main>
  );
}
