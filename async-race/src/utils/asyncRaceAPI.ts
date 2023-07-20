import { ListOfCarsData, ListOfWinnersData, ResponseCarData, RequestCarData } from './commonTypes';
import { RequestDirs } from './commonVars';

type GetAllResponseData = {
	data: Promise<ListOfCarsData & ListOfWinnersData>,
	totalCount: string | null
};

export default class AsyncRaceAPI {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private getResponse = async (
		URL: string,
		method = 'GET',
		headers: HeadersInit = {},
		body: BodyInit | null = null,
	): Promise<Response> => {
		const data = await fetch(URL, {
			method: method,
			headers: headers,
			body: body,
		}).catch(error => {
			throw error;
		});
		return data;
	};

	private getResponseData = async <T>(
		URL: string,
		method = 'GET',
		headers: HeadersInit = {},
		body: BodyInit | null = null,
	): Promise<T> => {
		const data = await this.getResponse(URL, method, headers, body);
		return data.json();
	};

	public getAllCarsData = async (pageNumber: number, carsPerPage: number): Promise<GetAllResponseData> => {
		let URL = `${this.baseUrl}/${RequestDirs.CARSDATAPATH}?`;
		if (pageNumber) URL += `_page=${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const data = await this.getResponse(URL)
			.catch((error) => {
				throw error;
			});
		return { data: data.json(), totalCount: data.headers.get('X-Total-Count') };
	};

	public getAllWinnersData = async (pageNumber: number, carsPerPage: number): Promise<GetAllResponseData> => {
		let URL = `${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}?`;
		if (pageNumber) URL += `_page${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const data = await this.getResponse(URL)
			.catch((error) => {
				throw error;
			});
		return { data: data.json(), totalCount: data.headers.get('X-Total-Count') };
	};

	public getCarDataByID = async (id: string): Promise<ResponseCarData> => {
		const data: ListOfCarsData = await this.getResponseData<ListOfCarsData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}?id=${id}`,
		).catch((error) => {
			throw error;
		});
		return data[0];
	};

	public createCarOnServer = async (carData: RequestCarData): Promise<ResponseCarData> => {
		const data = await this.getResponseData<ResponseCarData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}`,
			'POST',
			{ 'Content-Type': 'application/json' },
			JSON.stringify(carData),
		).catch((error) => {
			throw error;
		});
		return data;
	};
}