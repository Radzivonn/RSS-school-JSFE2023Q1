import { ListOfCarsData, ListOfWinnersData } from '@/utils/commonTypes';

export interface Model {
	setRequestData(): Promise<void>;
}

export interface Controller {
	view: View;
	model: Model;
	getView(): HTMLElement;
	init(): Promise<void>;
}

export interface View {
	createView(pageNumber: number, allWinnersData: ListOfWinnersData, allCarsData: ListOfCarsData): HTMLElement;
	updateView(winnersAmount: number, pageNumber: number, winnersData: ListOfWinnersData, allCarsData: ListOfCarsData): void;
}