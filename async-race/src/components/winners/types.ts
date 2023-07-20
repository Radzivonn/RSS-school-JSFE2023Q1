import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';

export interface Model {
	getDisplayedWinnersData(): Promise<ListOfWinnersData>;
	getDisplayedCarsData(): Promise<ListOfCarsData>
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