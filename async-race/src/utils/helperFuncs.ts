type ElementParams = Readonly<{
	tag: string,
	classNames?: string[],
	id?: string,
	attr?: {
		attrName: string,
		attrValue: string,
	}
	text?: string,
}>;

export const createElement = (params: ElementParams): HTMLElement => {
	const element = document.createElement(params.tag);
	if (params.classNames) element.classList.add(...params.classNames);
	element.id = params.id ? params.id : '';
	element.textContent = params.text ? params.text : '';
	if (params.attr) element.setAttribute(params.attr.attrName, params.attr.attrValue);
	return element;
};