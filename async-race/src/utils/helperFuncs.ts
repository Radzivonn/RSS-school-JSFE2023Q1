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

export const createPaginationButtons = (): HTMLElement[] =>
	[
		createElement({ tag: 'button', classNames: ['button', 'previous-button'], text: 'prev' }),
		createElement({ tag: 'button', classNames: ['button', 'next-button'], text: 'next' }),
	];

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
	// Maximum not included, minimum included
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

/**
 * A function that turns on the disabled attribute on all child elements of the block
 * @param block HTML block whose disabled attribute turns ON 
 */
export const lockBlock = (...blocks: HTMLElement[]): void => {
	blocks.forEach(block => {
		for (const childElem of block.children) childElem.setAttribute('disabled', '');
	});
};

/**
 * A function that turns off the disabled attribute on all child elements of the block
 * @param block HTML block whose disabled attribute turns OFF
 */
export const unlockBlock = (...blocks: HTMLElement[]): void => {
	blocks.forEach(block => {
		for (const childElem of block.children) childElem.removeAttribute('disabled');
	});
};

type DrawFunction = (element: HTMLElement, progress: number) => void;

export const drawCarMove: DrawFunction = (element: HTMLElement, progress: number): void => {
	const FINISHOFFSET = 151;
	element.style.transform = `translate(${progress * (document.documentElement.clientWidth - FINISHOFFSET)}px)`;
};

export const animateElement = (element: HTMLElement, duration: number, drawFunc: DrawFunction = drawCarMove): NodeJS.Timer => {
	const start = performance.now();
	
	const animationID = setInterval(() => {
		const progress = (performance.now() - start) / duration;
		if (progress < 1) drawFunc(element, progress);
		else clearInterval(animationID);
	}, 10);

	return animationID;
};