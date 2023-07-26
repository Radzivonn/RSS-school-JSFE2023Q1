import { Controller, AnimationIDs } from './types';
import { lockBlock, unlockBlock, animateElement } from '@/utils/helperFuncs';
import GaragePageModel from './garagePageModel';
import GaragePageView from './garagePageView';
import { ResponseWinnerData } from '@/utils/commonTypes';

export default class GaragePageController implements Controller {
	public view: GaragePageView;
	public model: GaragePageModel;
	private carsAnimationIDs: AnimationIDs = {};
	private winnerID: string | null = null;

	constructor(routingButtons: HTMLElement) {
		this.model = new GaragePageModel();
		this.view = new GaragePageView(routingButtons);
	}

	public async init(): Promise<void> {
		this.bindListeners();
	}

	private async renderView(): Promise<void> {
		const carsData = await this.model.getDisplayedCarsData();
		this.view.updateView(
			this.model.pageNumber,
			this.model.carsAmount,
			carsData,
		);
	}

	public getView(): HTMLElement {
		const componentView = this.view.createView();
		lockBlock(this.view.updatingBlock);
		// this.resetCars();
		this.renderView();
		return componentView;
	}

	private bindListeners(): void {
		this.view.gameControllers.buttons.createCarButton.addEventListener(
			'click',
			() => this.createCarButtonHandler(),
		);
		this.view.gameControllers.buttons.updateCarButton.addEventListener(
			'click',
			() => this.updateCarButtonHandler(),
		);
		this.view.gameControllers.buttons.raceButton.addEventListener(
			'click',
			() => this.raceButtonHandler(),
		);
		this.view.gameControllers.buttons.resetButton.addEventListener(
			'click',
			() => this.resetCars(),
		);
		this.view.gameControllers.buttons.generateCarsButton.addEventListener(
			'click',
			() => this.generateCarsButtonHandler(),
		);
		this.view.tracksBlock.addEventListener(
			'click',
			(e) => this.carControlButtonsHandler(e),
		);
		this.view.switchButtonsBlock.addEventListener(
			'click',
			(e) => this.paginationButtonsHandler(e),
		);
	}

	private async createCarButtonHandler(): Promise<void> {
		await this.model.createCar(
			{
				name: this.view.gameControllers.inputs.createCarInput.value,
				color: this.view.gameControllers.colorPalettes.createCarPalette.value,
			},
		);
		this.view.setCreateBlockValues('', '#000000');
		this.renderView();
	}

	private async generateCarsButtonHandler(): Promise<void> {
		await this.model.generateRandomCars();
		this.renderView();
	}

	private paginationButtonsHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (
			clickedElement
			&& ((clickedElement.classList.contains('next-button') && this.model.switchToNextPage())
			|| (clickedElement.classList.contains('previous-button') && this.model.switchToPrevPage()))
		) {
			this.renderView();
		}
	}

	private async updateCarButtonHandler(): Promise<void> {
		const carID = this.model.selectedCarID;
		if (carID) {
			const carData = await this.model.updateCarData(
				carID,
				{
					name: this.view.gameControllers.inputs.updateCarInput.value,
					color: this.view.gameControllers.colorPalettes.updateCarPalette.value,
				},
			);

			this.view.updateTrack(carData);
			this.model.selectedCarID = null;
			lockBlock(this.view.updatingBlock);
		}
	}

	private async raceButtonHandler(): Promise<void> {
		this.winnerID = null;
		this.view.gameControllers.buttons.raceButton.setAttribute('disabled', '');

		this.view.tracksBlock.querySelectorAll('.track').forEach(track => {
			const car = track.querySelector('.car') as HTMLElement;
			if (!this.carsAnimationIDs[track.id]) this.startCar(car, track.id);
		});
	}

	private async resetCars(): Promise<void> {
		const allTracks = this.view.tracksBlock.querySelectorAll('.track');
		for (const track of allTracks) {
			if (this.carsAnimationIDs[track.id]) {
				const car = track.querySelector('.car') as HTMLElement;
				await this.stopCar(car, track.id);
			}
		}
	}

	private carControlButtonsHandler(e: MouseEvent) {
		const clickedElement = e.target as HTMLElement | null;
		if (clickedElement) {
			switch (clickedElement.id) {
				case 'select': this.selectButtonHandler(clickedElement);
					break;
				case 'remove': this.removeButtonHandler(clickedElement);
					break;
				case 'start': this.startButtonHandler(clickedElement);
					break;
				case 'stop': this.stopButtonHandler(clickedElement);
					break;
			}
		}
	}

	private async selectButtonHandler(button: HTMLElement): Promise<void> {
		const track = button.closest('.track') as HTMLElement; // take parent element with class "track"
		const carData = await this.model.getCarData(track.id);
	
		if (Object.keys(carData).length > 0) {
			const updatingBlock = this.view.updatingBlock;
			unlockBlock(updatingBlock);

			this.view.setUpdateBlockValues(carData.name, carData.color);
			this.model.selectedCarID = track.id;
		}
	}

	private async removeButtonHandler(button: HTMLElement): Promise<void> {
		const track = button.closest('.track') as HTMLElement; // take parent element with class "track"

		this.model.deleteCar(track.id);
		this.view.setUpdateBlockValues('', '#000000');
		lockBlock(this.view.updatingBlock);

		this.renderView();
	}

	private startButtonHandler(button: HTMLElement): void {
		const track = button.closest('.track') as HTMLElement;
		const car = track.querySelector('.car') as HTMLElement;
		this.startCar(car, track.id);
	}

	private async startCar(car: HTMLElement, carID: string): Promise<void> {
		this.view.setCarControlsDuringMove(carID);

		const engineData = await this.model.toggleEngine(String(carID), 'started');
		const carVelocity = (engineData).velocity;
		let raceTime = this.model.DISTANCE / carVelocity; // race time in milliseconds

		this.view.setCarVelocityAttr(carID, carVelocity);
		const animationID = animateElement(car, raceTime);
		this.carsAnimationIDs[carID] = animationID;

		const carName = (await this.model.getCarData(carID)).name;

		this.model.switchEngineToDriveMode(carID).then(response => {
			clearInterval(this.carsAnimationIDs[carID]);

			if (response.ok && !this.winnerID && Object.keys(this.carsAnimationIDs).length > 1) {
				raceTime = Number((raceTime / 1000).toFixed(2));
				this.winnerID = carID;

				const detail: ResponseWinnerData = {
					id: Number(carID),
					wins: 1,
					time: raceTime,
				};
				document.dispatchEvent(new CustomEvent('carWon', { detail }));

				this.view.writeWinnerMessage(`${carName} went first ${raceTime} !`);
			}
		});
	}

	private stopButtonHandler(button: HTMLElement): void {
		const track = button.closest('.track') as HTMLElement;
		const car = track.querySelector('.car') as HTMLElement;
		this.stopCar(car, track.id);
	}

	private async stopCar(car: HTMLElement, carID: string): Promise<void> {
		await this.model.toggleEngine(carID, 'stopped');

		this.deleteAnimation(carID);
		if (Object.keys(this.carsAnimationIDs).length === 0) {
			this.view.gameControllers.buttons.raceButton.removeAttribute('disabled');
			this.view.gameControllers.buttons.resetButton.setAttribute('disabled', '');
			unlockBlock(this.view.switchButtonsBlock);
			this.renderView();
		}

		this.view.setCarControlsDuringParking(carID);
		this.view.putCarBack(car);
	}

	private deleteAnimation(carID: string): void {
		clearInterval(this.carsAnimationIDs[carID]);
		delete this.carsAnimationIDs[carID];
	}
}