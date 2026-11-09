import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={"brand-mark" + (large ? " brand-mark-large" : "")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M12 6h12a2 2 0 0 1 2 2v15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="6"
          y="10"
          width="15"
          height="18"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10.5 16h6M10.5 21h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  label = SITE_NAME,
  terminalDot = false,
}: {
  label?: string;
  terminalDot?: boolean;
}) {
  return (
    <Link href="/" className="logo" aria-label={label + " — prima pagină"}>
      <BrandMark />
      <span>
        {label}
        {terminalDot ? <span className="brand-dot" aria-hidden="true" /> : null}
      </span>
    </Link>
  );
}
