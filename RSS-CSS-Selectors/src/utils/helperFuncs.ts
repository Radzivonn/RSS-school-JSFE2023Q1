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

export const removeClasses = (elements: HTMLCollection, className: string): void => {
	for (const child of elements) child.classList.remove(className);
}