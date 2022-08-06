
/**
 * 
 * @param {import('@lezer/common').SyntaxNode} root 
 * @param {number} depth
 * @param {string} source
 */
export function debugSyntaxTree(root, depth, source) {
  let syntaxText = source.slice(root.from, root.to)
  let normalizedSyntaxText = syntaxText.includes('\n') ? "" : syntaxText;
	let ret = `${"  ".repeat(depth)}${root.name} @${root.from}..${root.to} \`${normalizedSyntaxText}\``;
	let child = root.firstChild;
	while (child) {
		if (
			!child.type.isAnonymous && ![`{`, "}", "(", ")", "[", "]"].includes(
				source.slice(child.from, child.to),
			)
		) {
			ret += `\n${traverse(child, depth + 1, source)}`;
		}
		child = child.nextSibling;
	}
	return ret;
}
