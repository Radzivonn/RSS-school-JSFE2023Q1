import { Cars, Winners, WinnerResponse } from '@/utils/commonTypes';

export interface Model {
	getDisplayedWinners(sortingFunction: SortingFunction): Promise<Winners>;
	getDisplayedCars(ListOfCarIDs: string[]): Promise<Cars>;
	getWinner(winnerID: string): Promise<WinnerResponse>;
	addWinner (winnerData: WinnerResponse): Promise<void>;
	updateWinner(winnerData: WinnerResponse, lastTime: number): Promise<void>;
	switchToNextPage(): void;
	switchToPreviosPage(): void;
}

export interface Controller {
	view: View;
	model: Model;
	init(): Promise<void>;
	getView(): HTMLElement;
}

export interface View {
	createView(): HTMLElement;
	updateView(
		pageNumber: number,
		winnersAmount: number,
		winnersData: Winners,
		carsData: Cars
	): void;
}

export type SortingCriterion = 'wins' | 'time';
export type SortingFunction = (carA: WinnerResponse, carB: WinnerResponse) => number;