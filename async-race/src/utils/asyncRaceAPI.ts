import { ListOfCarsData, ListOfWinnersData, ResponseCarData, CreatedCarData } from './commonTypes';
import { RequestDirs } from './commonVars';

export default class AsyncRaceAPI {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private getRequestData = async <T>(
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

	public getAllCarsData = async (): Promise<ListOfCarsData> => {
		const data = await this.getRequestData<ListOfCarsData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}`,
		).catch((error) => {
			throw error;
		});
		return data;
	};

	public getAllWinnersData = async (): Promise<ListOfWinnersData> => {
		const data = await this.getRequestData<ListOfWinnersData>(
			`${this.baseUrl}/${RequestDirs.WINNERSDATAPATH}`,
		).catch((error) => {
			throw error;
		});
		return data;
	};

	public getCarDataByID = async (id: string): Promise<ResponseCarData> => {
		const data: ListOfCarsData = await this.getRequestData<ListOfCarsData>(
			`${this.baseUrl}/${RequestDirs.CARSDATAPATH}?id=${id}`,
		).catch((error) => {
			throw error;
		});
		return data[0];
	};

	public createCarOnServer = async (carData: CreatedCarData): Promise<ResponseCarData> => {
		const data = await this.getRequestData<ResponseCarData>(
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