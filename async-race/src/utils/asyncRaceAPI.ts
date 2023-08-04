import {
	Cars,
	Winners,
	CarResponse,
	CarRequest,
	WinnerResponse,
	EngineResponse,
	EngineStatus,
} from './commonTypes';
import { RequestDirs } from './commonVars';

type CarsResponse = {
	data: Promise<Cars>,
	totalCount: string | null
};

type WinnersResponse = {
	data: Promise<Winners>,
	totalCount: string | null
};

export default class AsyncRaceAPI {
	private readonly BASE_URL = 'http://127.0.0.1:3000';

	private request = async (URL: string, requestParams: RequestInit): Promise<Response> => {
		return fetch(`${this.BASE_URL}/${URL}`, requestParams);
	};

	public getCars = async (pageNumber: number, carsPerPage: number): Promise<CarsResponse> => {
		const queryParams = new URLSearchParams({ _page: String(pageNumber), _limit: String(carsPerPage) });
		const endPoint = `${RequestDirs.CARS_PATH}?${queryParams}`;
		const response = await this.request(endPoint, {	method: 'GET' });
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getWinners = async (pageNumber: number, winnersPerPage: number): Promise<WinnersResponse> => {
		const queryParams = new URLSearchParams({ _page: String(pageNumber), _limit: String(winnersPerPage) });
		const endPoint = `${RequestDirs.WINNERS_PATH}?${queryParams}`;
		const response = await this.request(endPoint, {	method: 'GET' });
		return { data: response.json(), totalCount: response.headers.get('X-Total-Count') };
	};

	public getCar = async (carID: string): Promise<CarResponse> => {
		const endPoint = `${RequestDirs.CARS_PATH}/${carID}`;
		const response = await this.request(endPoint, { method: 'GET' });
		return response.json();
	};

	public getWinner = async (winnerID: string): Promise<WinnerResponse> => {
		const endPoint = `${RequestDirs.WINNERS_PATH}/${winnerID}`;
		const response = await this.request(endPoint, { method: 'GET' });
		return response.json();
	};

	public createWinner = async (winnerData: WinnerResponse): Promise<void> => {
		const endPoint = `${RequestDirs.WINNERS_PATH}`;
		await this.request(endPoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(winnerData),
		});
	};

	public updateWinner = async (winnerData: WinnerResponse): Promise<WinnerResponse> => {
		const endPoint = `${RequestDirs.WINNERS_PATH}/${String(winnerData.id)}`;
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

	public createCar = async (carData: CarRequest): Promise<CarResponse> => {
		const endPoint = `${RequestDirs.CARS_PATH}`;
		const response = await this.request(endPoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(carData),
		});
		return response.json();
	};

	public updateCar = async (carID: string, carData: CarRequest): Promise<CarResponse> => {
		const endPoint = `${RequestDirs.CARS_PATH}/${carID}`;
		const response = await this.request(endPoint, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(carData),
		});
		return response.json();
	};

	public removeCar = async (carID: string): Promise<void> => {
		const endPoint = `${RequestDirs.CARS_PATH}/${carID}`;
		await this.request(endPoint, { method: 'DELETE' });
	};

	public deleteWinner = async (carID: string): Promise<void> => {
		const endPoint = `${RequestDirs.WINNERS_PATH}/${carID}`;
		await this.request(endPoint, { method: 'DELETE' });
	};

	public toggleEngine = async (carID: string, engineStatus: EngineStatus): Promise<EngineResponse> => {
		const queryParams = new URLSearchParams({ id: String(carID), status: String(engineStatus) });
		const endPoint = `${RequestDirs.ENGINE_PATH}?${queryParams}`;
		const response = await this.request(endPoint, { method: 'PATCH' });
		return response.json();
	};

	public switchDriveMode = async (carID: string): Promise<Response> => {
		const queryParams = new URLSearchParams({ id: String(carID), status: 'drive' });
		const endPoint = `${RequestDirs.ENGINE_PATH}?${queryParams}`;
		const response = await this.request(endPoint, { method: 'PATCH' });
		return response;
	};
}