import { CustomAnimation } from '@/utils/animation';
import { Cars, CarRequest, CarResponse, EngineStatus, EngineResponse } from '@/utils/commonTypes';

export interface Model {
	getDisplayedCars(): Promise<Cars>;
	createCar(reqCarData: CarRequest): Promise<CarResponse>;
	getCar(id: string): Promise<CarResponse>
	switchToNextPage(): void;
	switchToPreviosPage(): void;
	generateRandomCars(): Promise<void>;
	updateCar(carID: string, reqData: CarRequest): Promise<CarResponse>;
	removeCar(carID: string): Promise<void>;
	toggleEngine(carID: string, engineStatus: EngineStatus): Promise<EngineResponse>;
	switchEngineToDriveMode(carID: string): Promise<Response>
}

export interface Controller {
	view: View;
	model: Model;
	init(): void;
	getView(): Promise<HTMLElement>;
}

export interface View {
	createView(): HTMLElement;
	updateView(
		pageNumber: number,
		carsAmount: number,
		carsData: Cars
	): void;
}

export type CarAnimations = {
	[key: string]: CustomAnimation;
};