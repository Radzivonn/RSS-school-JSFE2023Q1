import { Cars, Winners, WinnerResponse } from '@/utils/commonTypes';

export interface Model {
	getDisplayedWinners(sortingFunction: SortingFunction): Promise<Winners>;
	getDisplayedCars(ListOfCarIDs: string[]): Promise<Cars>
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