interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, string | number>; [key: string]: unknown };
}

function textContent(node: MarkdownNode): string {
  return node.value ?? node.children?.map(textContent).join("") ?? "";
}

function properties(node: MarkdownNode, values: Record<string, string | number>) {
  node.data = { ...node.data, hProperties: { ...node.data?.hProperties, ...values } };
}

// Etichetele provin din antetul real. Conținutul Markdown și amprenta sa nu se modifică.
export function remarkResponsiveTables() {
  return (tree: MarkdownNode) => {
    function visit(node: MarkdownNode) {
      if (node.type === "table") {
        const rows = node.children ?? [];
        const labels = (rows[0]?.children ?? []).map(cell => textContent(cell).trim());
        properties(node, {
          role: "table",
          "data-columns": labels.length,
          "data-mobile-layout": labels.length > 2 ? "stacked" : "compact",
        });
        rows.forEach((row, index) => {
          properties(row, { role: "row" });
          (row.children ?? []).forEach((cell, column) => {
            properties(cell, index === 0
              ? { role: "columnheader", scope: "col" }
              : { role: "cell", "data-label": labels[column] ?? "" });
          });
        });
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

