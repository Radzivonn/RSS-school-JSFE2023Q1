import {
	ListOfCarsData,
	ListOfWinnersData,
	ResponseCarData,
	RequestCarData,
	ResponseWinnerData,
	EngineData,
	EngineStatus,
} from './commonTypes';
import { BASEREQUESTURL, RequestDirs } from './commonVars';

type ListOfData = {
	data: Promise<ListOfCarsData & ListOfWinnersData>,
	totalCount: string | null
};

export default class AsyncRaceAPI {
	private baseURL = BASEREQUESTURL;

	private request = async (URL: string, requestParams: RequestInit): Promise<Response> => {
		return fetch(`${this.baseURL}/${URL}`, requestParams);
	};

	public getCars = async (pageNumber: number, carsPerPage: number): Promise<ListOfData> => {
		const queryParams = new URLSearchParams({ _page: String(pageNumber), _limit: String(carsPerPage) });
		const endPoint = `${RequestDirs.CARSDATAPATH}?${queryParams}`;
		const response = await this.request(endPoint, {	method: 'GET' });
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getWinners = async (pageNumber: number, winnersPerPage: number): Promise<ListOfData> => {
		const queryParams = new URLSearchParams({ _page: String(pageNumber), _limit: String(winnersPerPage) });
		const endPoint = `${RequestDirs.WINNERSDATAPATH}?${queryParams}`;
		const response = await this.request(endPoint, {	method: 'GET' });
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getCar = async (carID: string): Promise<ResponseCarData> => {
		const endPoint = `${RequestDirs.CARSDATAPATH}/${carID}`;
		const response = await this.request(endPoint, { method: 'GET' });
		return response.json();
	};

	public getWinner = async (winnerID: string): Promise<ResponseWinnerData> => {
		const endPoint = `${RequestDirs.WINNERSDATAPATH}/${winnerID}`;
		const response = await this.request(endPoint, { method: 'GET' });
		return response.json();
	};

	public createWinner = async (winnerData: ResponseWinnerData): Promise<void> => {
		const endPoint = `${RequestDirs.WINNERSDATAPATH}`;
		await this.request(endPoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(winnerData),
		});
	};

	public updateWinner = async (winnerData: ResponseWinnerData): Promise<ResponseWinnerData> => {
		const endPoint = `${RequestDirs.WINNERSDATAPATH}/${String(winnerData.id)}`;
		const response = await this.request(endPoint, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				wins: winnerData.wins,
				time: winnerData.time,
			}),
		});
		return response.json();
	};

	public createCar = async (carData: RequestCarData): Promise<ResponseCarData> => {
		const endPoint = `${RequestDirs.CARSDATAPATH}`;
		const response = await this.request(endPoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(carData),
		});
		return response.json();
	};

	public updateCar = async (carID: string, carData: RequestCarData): Promise<ResponseCarData> => {
		const endPoint = `${RequestDirs.CARSDATAPATH}/${carID}`;
		const response = await this.request(endPoint, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(carData),
		});
		return response.json();
	};

	public deleteCar = async (carID: string): Promise<void> => {
		const endPoint = `${RequestDirs.CARSDATAPATH}/${carID}`;
		await this.request(endPoint, { method: 'DELETE' });
	};

	public deleteWinner = async (carID: string): Promise<void> => {
		const endPoint = `${RequestDirs.WINNERSDATAPATH}/${carID}`;
		await this.request(endPoint, { method: 'DELETE' });
	};

	public toggleEngine = async (carID: string, engineStatus: EngineStatus): Promise<EngineData> => {
		const queryParams = new URLSearchParams({ id: String(carID), status: String(engineStatus) });
		const endPoint = `${RequestDirs.ENGINEDATAPATH}?${queryParams}`;
		const response = await this.request(endPoint, { method: 'PATCH' });
		return response.json();
	};

	public switchDriveMode = async (carID: string): Promise<Response> => {
		const queryParams = new URLSearchParams({ id: String(carID), status: 'drive' });
		const endPoint = `${RequestDirs.ENGINEDATAPATH}?${queryParams}`;
		const response = await this.request(endPoint, { method: 'PATCH' });
		return response;
	};
}