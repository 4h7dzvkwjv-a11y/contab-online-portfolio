"use client";

import { useState, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { whatsappAppUrl, whatsappUrl, whatsappWebUrl } from "@/lib/contact";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & { context?: string };

export function WhatsAppLink({ context = "", children, ...props }: Props) {
  const [showWeb, setShowWeb] = useState(false);
  function openApp(event: MouseEvent<HTMLAnchorElement>) {
    // Preserve modifier clicks and an official universal link without JavaScript.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setShowWeb(true);
    window.location.assign(whatsappAppUrl(context));
  }
  return <>
    <a {...props} href={whatsappUrl(context)} onClick={openApp}>{children}</a>
    {showWeb && <a className="whatsapp-web-fallback" href={whatsappWebUrl(context)} target="_blank" rel="noopener noreferrer">Folosește WhatsApp Web</a>}
  </>;
}
