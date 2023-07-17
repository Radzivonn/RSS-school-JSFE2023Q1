import { Model } from './types';
import { AllCarsData, ResponseCarData } from '@/utils/commonTypes';
import { getAllCarsData, createCarOnServer } from '@/utils/helperFuncs';

export default class GaragePageModel implements Model {
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;

	public async setRequestData(): Promise<void> {
		this.allCarsData = await getAllCarsData();
	}

	public async createCar(carName: string, carColor: string): Promise<ResponseCarData> {
		const carData = await createCarOnServer({ name: carName, color: carColor });
		console.log(carData);
		this.allCarsData.push(carData);
		return carData;
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
}