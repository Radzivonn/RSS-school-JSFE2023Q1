import { Model } from './types';
import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';
import { BASEREQUESTURL } from '@/utils/commonVars';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class WinnersPageModel implements Model {
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _winnersAmount = 0;
	private _carsAmount = 0;
	readonly WINNERSPERPAGE = 10;
	private readonly API = new AsyncRaceAPI(BASEREQUESTURL);

	public async getDisplayedWinnersData(): Promise<ListOfWinnersData> {
		const responseData = await this.API.getAllWinnersData(this.pageNumber, this.WINNERSPERPAGE)
			.catch(error => {
				throw error;
			});
		if (responseData.totalCount) this._winnersAmount = Number(responseData.totalCount); 
		this.updatePagesAmount();
		return responseData.data;
	}

	public async getDisplayedCarsData(): Promise<ListOfCarsData> {
		const responseData = await this.API.getAllCarsData(this.pageNumber, this.WINNERSPERPAGE)
		.catch(error => {
			throw error;
		});
		if (responseData.totalCount) this._carsAmount = Number(responseData.totalCount);
		return responseData.data;
	}

	private updatePagesAmount(): void {
		this._pagesAmount = Math.ceil(this.winnersAmount / this.WINNERSPERPAGE);
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

	public get winnersAmount() {
		return this._winnersAmount;
	}

	public get carsAmount() {
		return this._carsAmount;
	}
}