import type { SyntaxNode } from "@lezer/common";

function debugSyntaxTree(root: SyntaxNode, depth: number, source: string) {
  let syntaxText = source.slice(root.from, root.to);
  let normalizedSyntaxText = syntaxText.includes("\n") ? "" : syntaxText;
  let ret = `${"  ".repeat(depth)}${root.name} @${root.from}..${root.to} '${normalizedSyntaxText}'`;
  let child = root.firstChild;
  while (child) {
    if (!child.type.isAnonymous && ![`{`, "}", "(", ")", "[", "]"].includes(source.slice(child.from, child.to))) {
      ret += `\n${debugSyntaxTree(child, depth + 1, source)}`;
    }
    child = child.nextSibling;
  }
  return ret;
}

export function getLezerSyntaxTree(root: SyntaxNode, source: string) {
	return debugSyntaxTree(root, 0, source);
}
