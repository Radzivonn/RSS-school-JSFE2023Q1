import { Model } from './types';
import { Cars, CarResponse, CarRequest, EngineResponse, EngineStatus } from '@/utils/commonTypes';
import { carNames, carModels, carColors } from '@/utils/commonVars';
import { getRandomInt } from '@/utils/helperFuncs';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class GaragePageModel implements Model {
	public selectedCarID: string | null = null;
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _carsAmount = 0;
	private _displayedCars: Cars = [];
	readonly TRACKS_PER_PAGE = 7;
	readonly DISTANCE = 500000;
	private readonly RANDOM_CARS_AMOUNT = 100;
	private readonly API = new AsyncRaceAPI();

	public async createCar(reqCarData: CarRequest): Promise<CarResponse> {
		const carData = await this.API.createCar(reqCarData);
		if (this._displayedCars.length < this.TRACKS_PER_PAGE) {
			this._displayedCars.push(carData);
		}
		this._carsAmount++;
		this.updatePagesAmount();
		return carData;
	}

	public async getDisplayedCars(): Promise<Cars> {
		const responseData = await this.API.getCars(this.pageNumber, this.TRACKS_PER_PAGE);
		if (responseData.totalCount) this._carsAmount = Number(responseData.totalCount);
		const carsData = await responseData.data;

		this.updatePagesAmount();
		this._displayedCars = carsData;
		return carsData;
	}

	public async getCar(id: string): Promise<CarResponse> {
		const data = await this.API.getCar(id);
		return data;
	}

	public async generateRandomCars() {
		for (let i = 0; i < this.RANDOM_CARS_AMOUNT; i++) await this.createCar(this.createRandomCarData());
		this.updatePagesAmount();
	}

	private createRandomCarData = (): CarRequest => {
		return {
			name: `${carNames[getRandomInt(0, carNames.length)]} ${carModels[getRandomInt(0, carModels.length)]}`,
			color: carColors[getRandomInt(0, carColors.length)],
		};
	};

	public async updateCar(carID: string, reqData: CarRequest): Promise<CarResponse> {
		const carData = await this.API.updateCar(carID, reqData);
		return carData;
	}

	public async removeCar(carID: string) {
		await this.API.removeCar(carID);
		await this.API.deleteWinner(carID);
		await this.getDisplayedCars();
	}

	public async toggleEngine(carID: string, engineStatus: EngineStatus): Promise<EngineResponse> {
		return this.API.toggleEngine(carID, engineStatus);
	}

	public async switchEngineToDriveMode(carID: string): Promise<Response> {
		const response = this.API.switchDriveMode(carID);
		return response;
	}

	private updatePagesAmount() {
		this._pagesAmount = Math.ceil(this.carsAmount / this.TRACKS_PER_PAGE);
	}

	public async switchToNextPage() {
		if (this._pageNumber < this.pagesAmount) {
			this._pageNumber += 1;
			await this.getDisplayedCars();
		}
	}

	public async switchToPreviosPage() {
		if (this._pageNumber > 1) {
			this._pageNumber -= 1;
			await this.getDisplayedCars();
		}
	}

	public get pageNumber(): number {
		return this._pageNumber;
	}

	public get pagesAmount() {
		return this._pagesAmount;
	}

	public get carsAmount() {
		return this._carsAmount;
	}

	public get displayedCars() {
		return this._displayedCars;
	}
}