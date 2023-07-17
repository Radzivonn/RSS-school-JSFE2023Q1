import { Model } from './types';
import { AllCarsData, AllWinnersData } from '@/utils/commonTypes';
import { RequestDirs } from '@/utils/commonVars';
import { getCarsData } from '@/utils/helperFuncs';

export default class WinnersPageModel implements Model {
	private _allWinnersData: AllWinnersData = [];
	private _allCarsData: AllCarsData = [];
	private _pageNumber = 1;

	public async setRequestData(): Promise<void> {
		this.allCarsData = await getCarsData<AllCarsData>(RequestDirs.ALLCARSDATA);
		this.allWinnersData = await getCarsData<AllWinnersData>(RequestDirs.ALLWINNERSDATA);
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