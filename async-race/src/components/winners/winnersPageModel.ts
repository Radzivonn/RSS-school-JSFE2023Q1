import { Model, SortingFunction } from './types';
import { Cars, Winners, WinnerResponse } from '@/utils/commonTypes';
import AsyncRaceAPI from '@/utils/asyncRaceAPI';

export default class WinnersPageModel implements Model {
	private _pageNumber = 1;
	private _pagesAmount = 0;
	private _winnersAmount = 0;
	private _carsAmount = 0;
	public sortingFunction: SortingFunction | null = null;
	readonly WINNERS_PER_PAGE = 10;
	private readonly API = new AsyncRaceAPI();

	public async getDisplayedWinners(sortingFunction: SortingFunction): Promise<Winners> {
		const responseData = await this.API.getWinners(this.pageNumber, this.WINNERS_PER_PAGE);
		if (responseData.totalCount) this._winnersAmount = Number(responseData.totalCount); 
		this.updatePagesAmount();
		return (await responseData.data).sort(sortingFunction);
	}

	public async getDisplayedCars(ListOfCarIDs: string[]): Promise<Cars> {
		const carsData = await Promise.all(
			ListOfCarIDs.map(carID => this.API.getCar(carID)),
		);
		return carsData;
	}

	public async getWinner(winnerID: string): Promise<WinnerResponse> {
		const winnerData = await this.API.getWinner(winnerID);
		return winnerData;
	}

	public addWinner = async (winnerData: WinnerResponse): Promise<void> => {
		await this.API.createWinner(winnerData);
		this._winnersAmount++;
	};

	public async updateWinner(winnerData: WinnerResponse, lastTime: number): Promise<void> {
		const { id, wins, time } = winnerData;
		await this.API.updateWinner(
			{
				id: id,
				wins: wins + 1,
				time: time < lastTime ? time : lastTime,
			});
	}

	private updatePagesAmount(): void {
		this._pagesAmount = Math.ceil(this.winnersAmount / this.WINNERS_PER_PAGE);
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