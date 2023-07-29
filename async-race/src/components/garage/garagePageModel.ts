import { Model } from './types';
import { ListOfCarsData, ResponseCarData, RequestCarData, EngineData, EngineStatus } from '@/utils/commonTypes';
import { carNames, carModels, carColors } from '@/utils/commonVars';
import { getRandomInt } from '@/utils/helperFuncs';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class GaragePageModel implements Model {
	public selectedCarID: string | null = null;
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _carsAmount = 0;
	readonly TRACKSPERPAGE = 7;
	readonly DISTANCE = 500000;
	private readonly RANDOMCARSAMOUT = 100;
	private readonly API = new AsyncRaceAPI();

	public async createCar(reqCarData: RequestCarData): Promise<ResponseCarData> {
		const carData = await this.API.createCar(reqCarData);
		return carData;
	}

	public async getDisplayedCars(): Promise<ListOfCarsData> {
		const responseData = await this.API.getCars(this.pageNumber, this.TRACKSPERPAGE);
		if (responseData.totalCount) this._carsAmount = Number(responseData.totalCount);
		const carsData = await responseData.data;

		this.updatePagesAmount();
		return carsData;
	}

	public async getCar(id: string): Promise<ResponseCarData> {
		const data = await this.API.getCar(id);
		return data;
	}

	public async generateRandomCars(): Promise<void> {
		for (let i = 0; i < this.RANDOMCARSAMOUT; i++) this.createCar(this.createRandomCarData());
		this.updatePagesAmount();
	}

	private createRandomCarData = (): RequestCarData => {
		return {
			name: `${carNames[getRandomInt(0, carNames.length)]} ${carModels[getRandomInt(0, carModels.length)]}`,
			color: carColors[getRandomInt(0, carColors.length)],
		};
	};

	public async updateCar(carID: string, reqData: RequestCarData): Promise<ResponseCarData> {
		const carData = await this.API.updateCar(carID, reqData);
		return carData;
	}

	public async deleteCar(carID: string): Promise<void> {
		await this.API.deleteCar(carID);
		await this.API.deleteWinner(carID);
	}

	public async toggleEngine(carID: string, engineStatus: EngineStatus): Promise<EngineData> {
		const engineData = this.API.toggleEngine(carID, engineStatus);
		return engineData;
	}

	public async switchEngineToDriveMode(carID: string): Promise<Response> {
		const response = this.API.switchDriveMode(carID);
		return response;
	}

	private updatePagesAmount(): void {
		this._pagesAmount = Math.ceil(this.carsAmount / this.TRACKSPERPAGE);
	}

	/**
	 * Returns true if page was switched to next, else returns false
	 */
	public switchToNextPage(): boolean {
		if (this._pageNumber < this.pagesAmount) {
			this._pageNumber += 1;
			return true;
		}
		return false;
	}

	/**
	 * Returns true if page was switched to previous, else returns false
	 */
	public switchToPrevPage(): boolean {
		if (this._pageNumber > 1) {
			this._pageNumber -= 1;
			return true;
		}
		return false;
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
}