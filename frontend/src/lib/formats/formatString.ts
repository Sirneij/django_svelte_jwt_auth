export const formatText = (text: string): string => {
	const replacedText: string = text.replace(/_/g, ' ');
	return replacedText.charAt(0).toUpperCase() + replacedText.slice(1);
};
