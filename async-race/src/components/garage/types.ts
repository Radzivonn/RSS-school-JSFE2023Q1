import { ListOfCarsData, RequestCarData, ResponseCarData, EngineStatus, EngineData } from '@/utils/commonTypes';

export interface Model {
	getDisplayedCars(): Promise<ListOfCarsData>;
	createCar(reqCarData: RequestCarData): Promise<ResponseCarData>;
	getCar(id: string): Promise<ResponseCarData>
	switchToNextPage(): boolean;
	switchToPrevPage(): boolean;
	generateRandomCars(): Promise<void>;
	updateCar(carID: string, reqData: RequestCarData): Promise<ResponseCarData>;
	deleteCar(carID: string): Promise<void>;
	toggleEngine(carID: string, engineStatus: EngineStatus): Promise<EngineData>;
	switchEngineToDriveMode(carID: string): Promise<Response>
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

export type AnimationIDs = {
	[key: string]: NodeJS.Timer
};