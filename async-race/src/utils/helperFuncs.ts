import { BASEREQUESTtURL, RequestDirs } from './commonVars';
import carSVGcode from './carSVGcode';
import { AllCarsData, AllWinnersData, ResponseCarData, CreatedCarData } from './commonTypes';

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

export const getRequestData = async <T>(
	URL: string,
	method = 'GET',
	headers: HeadersInit = {},
	body: BodyInit | null = null,
): Promise<T> => {
	const data = await fetch(URL, {
		method: method,
		headers: headers,
		body: body,
	});
	if (data.ok) return data.json();
	throw new Error(data.statusText);
};

export const getAllCarsData = async (): Promise<AllCarsData> => {
	const data = await getRequestData<AllCarsData>(`${BASEREQUESTtURL}/${RequestDirs.CARSDATAPATH}`);
	return data;
};

export const getAllWinnersData = async (): Promise<AllWinnersData> => {
	const data = await getRequestData<AllWinnersData>(`${BASEREQUESTtURL}/${RequestDirs.WINNERSDATAPATH}`);
	return data;
};

export const createCarImg = (color: string): HTMLElement => {
	const car = createElement({ tag: 'div', classNames: ['car'] });
	car.style.fill = color;
	car.insertAdjacentHTML('afterbegin', carSVGcode);
	return car;
};