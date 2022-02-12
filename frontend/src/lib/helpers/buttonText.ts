export const changeText = (e: Event, text: string) => {
	(<HTMLButtonElement>e.target).textContent = text;
};
