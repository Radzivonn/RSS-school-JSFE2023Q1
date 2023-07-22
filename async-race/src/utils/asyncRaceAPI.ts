import { ListOfCarsData, ListOfWinnersData, ResponseCarData, RequestCarData, WinnerData } from './commonTypes';
import { RequestDirs } from './commonVars';

type ListOfData = {
	data: Promise<ListOfCarsData & ListOfWinnersData>,
	totalCount: string | null
};

export default class AsyncRaceAPI {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private requestData = async (
		URL: string,
		method = 'GET',
		headers: HeadersInit = {},
		body: BodyInit | null = null,
	): Promise<Response> => {
		const response = await fetch(URL, {
			method: method,
			headers: headers,
			body: body,
		});
		return response;
	};

	public getListOfCarsData = async (pageNumber: number, carsPerPage: number): Promise<ListOfData> => {
		let URL = `${this.baseUrl}/${RequestDirs.CARSDATAPATH}?`;
		if (pageNumber) URL += `_page=${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const response = await this.requestData(URL);
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getListOfWinnersData = async (pageNumber: number, carsPerPage: number): Promise<ListOfData> => {
		let URL = `${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}?`;
		if (pageNumber) URL += `_page${pageNumber}`;
		if (carsPerPage) URL += `&_limit=${carsPerPage}`;
		const response = await this.requestData(URL);
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getCarDataByID = async (carID: string): Promise<ResponseCarData> => {
		const response = await this.requestData(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}/${carID}`,
		);
		return response.json();
	};

	public getWinnerDataByID = async (carID: string): Promise<WinnerData> => {
		const response = await this.requestData(
			`${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}/${carID}`,
		);
		return response.json();
	};

	public createCarOnServer = async (carData: RequestCarData): Promise<ResponseCarData> => {
		const response = await this.requestData(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}`,
			'POST',
			{ 'Content-Type': 'application/json' },
			JSON.stringify(carData),
		);
		return response.json();
	};

	public updateCarOnServer = async (carID: string, carData: RequestCarData): Promise<ResponseCarData> => {
		const response = await this.requestData(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}/${carID}`,
			'PUT',
			{ 'Content-Type': 'application/json' },
			JSON.stringify(carData),
		);
		return response.json();
	};

	public deleteCarOnServer = async (carID: string): Promise<void> => {
		await this.requestData(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}/${carID}`,
			'DELETE',
		);
	};

	public deleteWinnerOnServer = async (carID: string): Promise<void> => {
		await this.requestData(
			`${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}/${carID}`,
			'DELETE',
		);
	};
}