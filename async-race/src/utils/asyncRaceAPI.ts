import { ListOfCarsData, ListOfWinnersData, ResponseCarData, RequestCarData, WinnerData } from './commonTypes';
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
		});
		return data;
	};

	private getResponseData = async <T>(
		URL: string,
		method = 'GET',
		headers: HeadersInit = {},
		body: BodyInit | null = null,
	): Promise<T> => {
		const data = await this.getResponse(
			URL,
			method,
			headers,
			body,
		);
		return data.json();
	};

	public getAllCarsData = async (pageNumber: number, carsPerPage: number): Promise<GetAllResponseData> => {
		let URL = `${this.baseUrl}/${RequestDirs.CARSDATAPATH}?`;
		if (pageNumber) URL += `_page=${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const data = await this.getResponse(URL);
		return { data: data.json(), totalCount: data.headers.get('X-Total-Count') };
	};

	public getAllWinnersData = async (pageNumber: number, carsPerPage: number): Promise<GetAllResponseData> => {
		let URL = `${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}?`;
		if (pageNumber) URL += `_page${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const data = await this.getResponse(URL);
		return { data: data.json(), totalCount: data.headers.get('X-Total-Count') };
	};

	public getCarDataByID = async (carID: string): Promise<ResponseCarData> => {
		const data = await this.getResponseData<ListOfCarsData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}?id=${carID}`,
		);
		return data[0];
	};

	public getWinnerDataByID = async (carID: string): Promise<WinnerData> => {
		const data = await this.getResponseData<ListOfWinnersData>(
			`${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}?id=${carID}`,
		);
		return data[0];
	};

	public createCarOnServer = async (carData: RequestCarData): Promise<ResponseCarData> => {
		const data = await this.getResponseData<ResponseCarData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}`,
			'POST',
			{ 'Content-Type': 'application/json' },
			JSON.stringify(carData),
		);
		return data;
	};

	public updateCarOnServer = async (carID: string, carData: RequestCarData): Promise<ResponseCarData> => {
		const data = await this.getResponseData<ResponseCarData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}/${carID}`,
			'PUT',
			{ 'Content-Type': 'application/json' },
			JSON.stringify(carData),
		);
		return data;
	};

	public deleteCarOnServer = async (carID: string): Promise<void> => {
		await this.getResponseData<ResponseCarData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}/${carID}`,
			'DELETE',
		);
	};

	public deleteWinnerOnServer = async (carID: string): Promise<void> => {
		await this.getResponseData(
			`${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}/${carID}`,
			'DELETE',
		);
	};
}