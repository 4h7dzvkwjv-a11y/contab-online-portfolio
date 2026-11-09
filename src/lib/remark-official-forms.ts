import { formDownloadTitle, nodeText, splitFormReferences } from "./form-links";

interface MarkdownNode {
  type: string;
  value?: string;
  url?: string;
  title?: string | null;
  children?: MarkdownNode[];
}

function linkFor(part: ReturnType<typeof splitFormReferences>[number], child?: MarkdownNode): MarkdownNode {
  return {
    type: "link",
    url: part.form!.filePath,
    title: formDownloadTitle(part.form!, part.text),
    children: [child ?? { type: "text", value: part.text }],
  };
}

// Leagă referințele la randare; corpul editorial și amprenta lui rămân intacte.
// Citările externe și trimiterile descriptive la ghiduri își păstrează destinația.
export function remarkOfficialForms() {
  return (tree: MarkdownNode) => {
    function visit(node: MarkdownNode) {
      if (["code", "html", "image", "imageReference", "linkReference"].includes(node.type)) return;
      if (node.type === "link") {
        const label = nodeText(node);
        const parts = splitFormReferences(label);
        if (node.url?.startsWith("/articol/") && parts.length === 1 && parts[0].form) {
          node.url = parts[0].form.filePath;
          node.title = formDownloadTitle(parts[0].form, label);
        }
        return;
      }
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type === "text" && child.value) {
          return splitFormReferences(child.value).map((part) => part.form
            ? linkFor(part)
            : { type: "text", value: part.text });
        }
        if (child.type === "inlineCode" && child.value) {
          const parts = splitFormReferences(child.value);
          return parts.length === 1 && parts[0].form ? [linkFor(parts[0], child)] : [child];
        }
        visit(child);
        return [child];
      });
    }
    visit(tree);
  };
}
