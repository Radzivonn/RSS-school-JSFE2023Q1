type Params = Readonly<{
	tag: string,
	classNames?: Array<string>,
	id?: string,
	text?: string,
}>

export const createElement = (params: Params): HTMLElement => {
	const element = document.createElement(params.tag);
	if(params.classNames) element.classList.add(...params.classNames);
	element.id = params.id ? params.id : '';
	element.textContent = params.text ? params.text : '';
	return element;
}

export const animateElem = (element: Element, animationName: string, animationDuration = 1000) => {
	element.classList.add(animationName);
	setTimeout(() => element.classList.remove(animationName), animationDuration);
}

export const animateElements = (elements: Element[], animationName: string, animationDuration = 1000) => {
	elements.forEach(element => animateElem(element, animationName, animationDuration));
}

export const removeClasses = (elements: HTMLCollection, className: string): void => {
	for (const child of elements) child.classList.remove(className);
}

export const getEventElement = (e: Event, childClassName: string): HTMLElement | null => {
	return (<HTMLElement>e.target).closest(`.${childClassName}`);
}

export const hoverHandler = (e: Event, childClassName: string): void => {
	const hoveredElement = getEventElement(e, childClassName);
	if (hoveredElement) {
		document.querySelectorAll(`[number="${hoveredElement.getAttribute('number')}"]`).forEach(element => {
			element.classList.toggle('hovered');
		});
	}
}