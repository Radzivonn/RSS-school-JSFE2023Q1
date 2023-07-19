import { Model } from './types';
import { AllCarsData, ResponseCarData } from '@/utils/commonTypes';
import { getAllCarsData, createCarOnServer, generateRandomCarsData } from '@/utils/helperFuncs';

export default class GaragePageModel implements Model {
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;
	private _pagesAmount = 0;
	readonly TRACKSPERPAGE = 7;
	private readonly RANDOMCARSAMOUT = 100;

	public async setRequestData(): Promise<void> {
		this._allCarsData = await getAllCarsData()
			.catch(error => {
				throw error;
			});
		this.updatePagesAmount();
	}

	public async createCar(carName: string, carColor: string): Promise<ResponseCarData> {
		const carData = await createCarOnServer({ name: carName, color: carColor })
			.catch(error => {
				throw error;
			});
		this.allCarsData.push(carData);
		this.updatePagesAmount();
		return carData;
	}

	public getDisplayedCarsData(): AllCarsData {
		return this.allCarsData.slice(
			(this.pageNumber - 1) * this.TRACKSPERPAGE,
			this.TRACKSPERPAGE * this.pageNumber,
		);
	}

	public async generateRandomCars(): Promise<void> {
		const carsData = await generateRandomCarsData(this.RANDOMCARSAMOUT);
		this.allCarsData.push(...carsData);
		this.updatePagesAmount();
	}

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

	public get allCarsData(): AllCarsData {
		return this._allCarsData;
	}

	public get pagesAmount() {
		return this._pagesAmount;
	}
}