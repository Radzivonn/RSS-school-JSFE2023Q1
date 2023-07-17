import { Model } from './types';
import { AllCarsData, ResponseCarData } from '@/utils/commonTypes';
import { getAllCarsData, createCarOnServer } from '@/utils/helperFuncs';

export default class GaragePageModel implements Model {
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;
	private _pagesAmount = 0;
	readonly TRACKSPERPAGE = 7;

	public async setRequestData(): Promise<void> {
		this.allCarsData = await getAllCarsData();
		this.updatePagesAmount();
	}

	public async createCar(carName: string, carColor: string): Promise<ResponseCarData> {
		const carData = await createCarOnServer({ name: carName, color: carColor });
		console.log(carData);
		this.allCarsData.push(carData);
		return carData;
	}

	public getDisplayedCarsData(): AllCarsData {
		return this.allCarsData.slice(
			(this.pageNumber - 1) * this.TRACKSPERPAGE,
			this.TRACKSPERPAGE * this.pageNumber,
		);
	}
	
	private updatePagesAmount() {
		this.pagesAmount = this.allCarsData.length / this.TRACKSPERPAGE;
	}

	public switchToNextPage(): void {
		if (this.pageNumber <= this.pagesAmount) this.pageNumber += 1;
	}

	public switchToPrevPage(): void {
		if (this.pageNumber > 1) this.pageNumber -= 1;
	}

	public get pageNumber(): number {
		return this._pageNumber;
	}

	public set pageNumber(value) {
		this._pageNumber = value;
	}

	public get allCarsData(): AllCarsData {
		return this._allCarsData;
	}

	public set allCarsData(data) {
		this._allCarsData = data;
	}

	public get pagesAmount() {
		return this._pagesAmount;
	}

	public set pagesAmount(value) {
		this._pagesAmount = value;
	}
}