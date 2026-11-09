import type { ComponentPropsWithoutRef } from "react";
import styles from "./article-table.module.css";

type TableProps = ComponentPropsWithoutRef<"table"> & {
  "data-mobile-layout"?: string;
};

export function ArticleTable({ children, ...props }: TableProps) {
  return (
    <div
      className={styles.root}
      data-mobile-layout={props["data-mobile-layout"]}
      role="region"
      aria-label="Tabel din articol"
      tabIndex={0}
    >
      <table {...props}>{children}</table>
    </div>
  );
}

export function ArticleTableCell({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td {...props}><span className={styles.value}>{children}</span></td>;
}

