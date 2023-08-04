import carSVGcode from './carSVGcode';

type ElementParams = Readonly<{
	tag: string,
	classNames?: string[],
	id?: string,
	attrs?: {
		attrName: string,
		attrValue: string,
	}[]
	text?: string,
}>;

export const createElement = (params: ElementParams): HTMLElement => {
	const element = document.createElement(params.tag);
	if (params.classNames) element.classList.add(...params.classNames);
	element.id = params.id ? params.id : '';
	element.textContent = params.text ? params.text : '';
	if (params.attrs) {
		params.attrs.forEach(attr => {
			element.setAttribute(attr.attrName, attr.attrValue);
		});
	}
	return element;
};

export const createCarNode = (color: string): HTMLElement => {
	const car = createElement(
		{
			tag: 'div',
			classNames: ['car'],
		},
	);
	car.style.fill = color;
	car.insertAdjacentHTML('afterbegin', carSVGcode);
	return car;
};

export function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

export const disableBlock = (...blocks: HTMLElement[]): void => {
	blocks.forEach(block => {
		for (const childElem of block.children) childElem.setAttribute('disabled', '');
	});
};

export const enableBlock = (...blocks: HTMLElement[]): void => {
	blocks.forEach(block => {
		for (const childElem of block.children) childElem.removeAttribute('disabled');
	});
};

export type DrawFunction = (element: HTMLElement, progress: number) => void;

export const drawCarMovement: DrawFunction = (element: HTMLElement, progress: number): void => {
	const FINISH_OFFSET = 151;
	element.style.transform = `translate(${progress * (document.documentElement.clientWidth - FINISH_OFFSET)}px)`;
};