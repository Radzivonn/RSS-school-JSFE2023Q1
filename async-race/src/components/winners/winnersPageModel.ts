import { Model } from './types';
import { AllCarsData, AllWinnersData } from '@/utils/commonTypes';
import { getAllCarsData, getAllWinnersData } from '@/utils/helperFuncs';

export default class WinnersPageModel implements Model {
	private _allWinnersData: AllWinnersData = [];
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;

	public async setRequestData(): Promise<void> {
		this.allCarsData = await getAllCarsData()
			.catch(error => {
				throw error;
			});
		this.allWinnersData = await getAllWinnersData()
			.catch(error => {
				throw error;
			});
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

	public get allWinnersData(): AllWinnersData {
		return this._allWinnersData;
	}

	public set allWinnersData(data) {
		this._allWinnersData = data;
	}
}