import { BASEREQUESTtURL } from './commonVars';
import carSVGcode from './carSVGcode';

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

export const createPaginationButtons = (): HTMLElement[] =>
	[
		createElement({ tag: 'button', classNames: ['button', 'previous-button'], text: 'prev' }),
		createElement({ tag: 'button', classNames: ['button', 'next-button'], text: 'next' }),
	];

export const getRequestData = async <T>(URL: string): Promise<T> => {
	const data = await fetch(URL);
	if (data.ok) return data.json();
	throw new Error(data.statusText);
};

export const getCarsData = async <T>(requestDir: string): Promise<T> => {
	const data = await getRequestData<T>(`${BASEREQUESTtURL}/${requestDir}`);
	return data;
};

export const createCarImg = (color: string): HTMLElement => {
	const car = createElement({ tag: 'div', classNames: ['car'] });
	car.style.fill = color;
	car.insertAdjacentHTML('afterbegin', carSVGcode);
	return car;
};