function isAllWhitespaces(nod: CharacterData): boolean {
	// Use ECMA-262 Edition 3 String and RegExp features
	return !/[^\t\n\r ]/.test(nod.textContent);
}
function isIgnorable(nod: Node): boolean {
	return (
		nod.nodeType == 8 || // A comment node
		(nod.nodeType == 3 && isAllWhitespaces(nod as CharacterData))
	); // a text node, all ws
}
export function nodeBefore(sib: Node): HTMLInputElement | undefined {
	while ((sib = sib.previousSibling)) {
		if (!isIgnorable(sib)) return sib as HTMLInputElement;
	}
	return null;
}
