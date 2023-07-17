import { Model } from './types';
import { AllCarsData } from '@/utils/commonTypes';
import { getAllCarsData } from '@/utils/helperFuncs';

export default class GaragePageModel implements Model {
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;

	public async setRequestData(): Promise<void> {
		this.allCarsData = await getAllCarsData();
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