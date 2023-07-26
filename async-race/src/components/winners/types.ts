import { ListOfCarsData, ListOfWinnersData, ResponseWinnerData } from '@/utils/commonTypes';

export interface Model {
	getDisplayedWinnersData(sortingFunction: SortingFunction): Promise<ListOfWinnersData>;
	getDisplayedCarsData(ListOfCarIDs: string[]): Promise<ListOfCarsData>
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
		winnersData: ListOfWinnersData,
		carsData: ListOfCarsData
	): void;
}

export type SortingCriterion = 'wins' | 'time';
export type SortingFunction = (carA: ResponseWinnerData, carB: ResponseWinnerData) => number;