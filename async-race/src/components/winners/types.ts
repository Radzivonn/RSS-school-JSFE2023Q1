import { AllCarsData, AllWinnersData } from '@/utils/commonTypes';

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
	createView(pageNumber: number, allWinnersData: AllWinnersData, allCarsData: AllCarsData): HTMLElement;
	updateView(winnersAmount: number, pageNumber: number, winnersData: AllWinnersData, allCarsData: AllCarsData): void;
}