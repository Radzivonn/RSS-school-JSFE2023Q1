import { Model, SortingFunction } from './types';
import { ListOfCarsData, ListOfWinnersData, ResponseWinnerData } from '@/utils/commonTypes';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class WinnersPageModel implements Model {
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _winnersAmount = 0;
	private _carsAmount = 0;
	public sortingFunction: SortingFunction | null = null;
	readonly WINNERSPERPAGE = 10;
	private readonly API = new AsyncRaceAPI();

	public async getDisplayedWinnersData(sortingFunction: SortingFunction): Promise<ListOfWinnersData> {
		const responseData = await this.API.getListOfWinnersData(this.pageNumber, this.WINNERSPERPAGE);
		if (responseData.totalCount) this._winnersAmount = Number(responseData.totalCount); 
		this.updatePagesAmount();
		return (await responseData.data).sort(sortingFunction);
	}

	public async getDisplayedCarsData(ListOfCarIDs: string[]): Promise<ListOfCarsData> {
		const carsData = await Promise.all(
			ListOfCarIDs.map(carID => this.API.getCarDataByID(carID)),
		);
		return carsData;
	}

	public async getWinnerData(winnerID: string): Promise<ResponseWinnerData> {
		const winnerData = await this.API.getWinnerDataByID(winnerID);
		return winnerData;
	}

	public addWinner = async (winnerData: ResponseWinnerData): Promise<void> => {
		await this.API.createWinnerOnServer(winnerData);
		this._winnersAmount++;
	};

	public async updateWinner(winnerData: ResponseWinnerData, lastTime: number): Promise<void> {
		const { id, wins, time } = winnerData;
		await this.API.updateWinnerOnServer(
			{
				id: id,
				wins: wins + 1,
				time: time < lastTime ? time : lastTime,
			});
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