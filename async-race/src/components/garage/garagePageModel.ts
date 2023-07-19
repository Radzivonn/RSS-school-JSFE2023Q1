import { Model } from './types';
import { ListOfCarsData, ResponseCarData, CreatedCarData } from '@/utils/commonTypes';
import { BASEREQUESTURL, carNames, carModels, carColors } from '@/utils/commonVars';
import { getRandomInt } from '@/utils/helperFuncs';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class GaragePageModel implements Model {
	public selectedCarID: string | null = null;
	private _allCarsData: ListOfCarsData = [];
	private _pageNumber = 1;
	private _pagesAmount = 0;
	readonly TRACKSPERPAGE = 7;
	private readonly RANDOMCARSAMOUT = 100;
	private readonly API = new AsyncRaceAPI(BASEREQUESTURL);

	public async setRequestData(): Promise<void> {
		this._allCarsData = await this.API.getAllCarsData()
			.catch(error => {
				throw error;
			});
		this.updatePagesAmount();
	}

	public async createCar(carName: string, carColor: string): Promise<ResponseCarData> {
		const carData = await this.API.createCarOnServer({ name: carName, color: carColor })
			.catch(error => {
				throw error;
			});
		this.allCarsData.push(carData);
		this.updatePagesAmount();
		return carData;
	}

	public getDisplayedCarsData(): ListOfCarsData {
		return this.allCarsData.slice(
			(this.pageNumber - 1) * this.TRACKSPERPAGE,
			this.TRACKSPERPAGE * this.pageNumber,
		);
	}

	public async getCarData(id: string): Promise<ResponseCarData> {
		const data = await this.API.getCarDataByID(id);
		return data;
	}

	public async generateRandomCars(): Promise<void> {
		const carsData = await this.generateRandomCarsData(this.RANDOMCARSAMOUT);
		this.allCarsData.push(...carsData);
		this.updatePagesAmount();
	}

	private generateRandomCarsData = (carsAmount: number): Promise<ResponseCarData[]> => {
		const carsData: Promise<ResponseCarData>[] = [];
		for (let i = 0; i < carsAmount; i++) {
			carsData.push(this.API.createCarOnServer(this.createRandomCarData()));
		}
		return Promise.all(carsData);
	};

	private createRandomCarData = (): CreatedCarData => {
		return {
			name: `${carNames[getRandomInt(0, carNames.length)]} ${carModels[getRandomInt(0, carModels.length)]}`,
			color: carColors[getRandomInt(0, carColors.length)],
		};
	};

	private updatePagesAmount(): void {
		this._pagesAmount = Math.ceil(this.allCarsData.length / this.TRACKSPERPAGE);
	}

	public switchToNextPage(): void {
		if (this.pageNumber < this.pagesAmount) this._pageNumber += 1;
	}

	public switchToPrevPage(): void {
		if (this.pageNumber > 1) this._pageNumber -= 1;
	}

	public get pageNumber(): number {
		return this._pageNumber;
	}

	public get allCarsData(): ListOfCarsData {
		return this._allCarsData;
	}

	public get pagesAmount() {
		return this._pagesAmount;
	}
}