import carSVGcode from './carSVGcode';
import { ListOfCarsData, ListOfWinnersData, ResponseCarData, CreatedCarData } from './commonTypes';
import { BASEREQUESTtURL, RequestDirs, carColors, carModels, carNames } from './commonVars';

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
	}).catch(error => {
		throw error;
	});
	return data.json();
};

export const getAllCarsData = async (): Promise<ListOfCarsData> => {
	const data = await getRequestData<ListOfCarsData>(
		`${BASEREQUESTtURL}/${RequestDirs.CARSDATAPATH}`,
	).catch((error) => {
		throw error;
	});
	return data;
};

export const getAllWinnersData = async (): Promise<ListOfWinnersData> => {
	const data = await getRequestData<ListOfWinnersData>(
		`${BASEREQUESTtURL}/${RequestDirs.WINNERSDATAPATH}`,
	).catch((error) => {
		throw error;
	});
	return data;
};

export const createCarOnServer = async (carData: CreatedCarData): Promise<ResponseCarData> => {
	const data = await getRequestData<ResponseCarData>(
		`${BASEREQUESTtURL}/${RequestDirs.CARSDATAPATH}`,
		'POST',
		{ 'Content-Type': 'application/json' },
		JSON.stringify(carData),
	).catch((error) => {
		throw error;
	});
	return data;
};

export const createCarImg = (color: string): HTMLElement => {
	const car = createElement({ tag: 'div', classNames: ['car'] });
	car.style.fill = color;
	car.insertAdjacentHTML('afterbegin', carSVGcode);
	return car;
};

export function getRandomInt(min: number, max: number): number {
	// Maximum not included, minimum included
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

export const createRandomCarData = (): CreatedCarData => {
	return {
		name: `${carNames[getRandomInt(0, carNames.length)]} ${carModels[getRandomInt(0, carModels.length)]}`,
		color: carColors[getRandomInt(0, carColors.length)],
	};
};

export const generateRandomCarsData = (carsAmount: number): Promise<ResponseCarData[]> => {
	const carsData: Promise<ResponseCarData>[] = [];
	for (let i = 0; i < carsAmount; i++) {
		carsData.push(createCarOnServer(createRandomCarData()));
	}
	return Promise.all(carsData);
};