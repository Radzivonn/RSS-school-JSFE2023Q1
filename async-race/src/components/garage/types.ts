import { AllCarsData } from '@/utils/commonTypes';

export interface Model {
	setRequestData(): Promise<void>;
}

export interface Controller {
	view: View;
	model: Model;
	init(): Promise<void>;
	getView(): HTMLElement;
}

export interface View {
	createView(pageNumber: number, allCarsAmount: number, allCarsData: AllCarsData,): HTMLElement;
	updateView(pageNumber: number, allCarsAmount: number, carsData: AllCarsData): void;
}