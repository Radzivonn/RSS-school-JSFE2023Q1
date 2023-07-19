import { Model } from './types';
import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';
import { BASEREQUESTURL } from '@/utils/commonVars';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class WinnersPageModel implements Model {
	private _allWinnersData: ListOfWinnersData = [];
	private _allCarsData: ListOfCarsData = [];
	private _pageNumber = 1;
	private readonly API = new AsyncRaceAPI(BASEREQUESTURL);

	public async setRequestData(): Promise<void> {
		this.allCarsData = await this.API.getAllCarsData()
			.catch(error => {
				throw error;
			});
		this.allWinnersData = await this.API.getAllWinnersData()
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

	public get allCarsData(): ListOfCarsData {
		return this._allCarsData;
	}

	public set allCarsData(data) {
		this._allCarsData = data;
	}

	public get allWinnersData(): ListOfWinnersData {
		return this._allWinnersData;
	}

	public set allWinnersData(data) {
		this._allWinnersData = data;
	}
}