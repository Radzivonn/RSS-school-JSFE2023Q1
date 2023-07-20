import { ListOfCarsData, RequestCarData, ResponseCarData } from '@/utils/commonTypes';

export interface Model {
	getDisplayedCarsData(): Promise<ListOfCarsData>;
	createCar(reqCarData: RequestCarData): Promise<ResponseCarData>;
	getCarData(id: string): Promise<ResponseCarData>
	switchToNextPage(): boolean;
	switchToPrevPage(): boolean;
	generateRandomCars(): Promise<void>
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
		carsAmount: number,
		carsData: ListOfCarsData
	): void;
}