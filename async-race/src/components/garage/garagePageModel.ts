import { Model } from './types';
import { ListOfCarsData, ResponseCarData, RequestCarData } from '@/utils/commonTypes';
import { BASEREQUESTURL, carNames, carModels, carColors } from '@/utils/commonVars';
import { getRandomInt } from '@/utils/helperFuncs';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class GaragePageModel implements Model {
	public selectedCarID: string | null = null;
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _carsAmount = 0;
	readonly TRACKSPERPAGE = 7;
	private readonly RANDOMCARSAMOUT = 100;
	private readonly API = new AsyncRaceAPI(BASEREQUESTURL);

	public async createCar(reqCarData: RequestCarData): Promise<ResponseCarData> {
		const carData = await this.API.createCarOnServer(reqCarData)
			.catch(error => {
				throw error;
			});
		this._carsAmount++;
		return carData;
	}

	public async getDisplayedCarsData(): Promise<ListOfCarsData> {
		const responseData = await this.API.getAllCarsData(this.pageNumber, this.TRACKSPERPAGE)
			.catch(error => {
				throw error;
			});
		if (responseData.totalCount) this._carsAmount = Number(responseData.totalCount);
		this.updatePagesAmount();
		return responseData.data;
	}

	public async getCarData(id: string): Promise<ResponseCarData> {
		const data = await this.API.getCarDataByID(id);
		return data;
	}

	public async generateRandomCars(): Promise<void> {
		for (let i = 0; i < this.RANDOMCARSAMOUT; i++) this.createCar(this.createRandomCarData());
		this._carsAmount += this.RANDOMCARSAMOUT;
		this.updatePagesAmount();
	}

	private createRandomCarData = (): RequestCarData => {
		return {
			name: `${carNames[getRandomInt(0, carNames.length)]} ${carModels[getRandomInt(0, carModels.length)]}`,
			color: carColors[getRandomInt(0, carColors.length)],
		};
	};

	public async updateCarData(carID: string, reqData: RequestCarData): Promise<ResponseCarData> {
		const carData = await this.API.updateCarOnServer(carID, reqData);
		return carData;
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