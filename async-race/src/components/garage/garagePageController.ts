import { lockBlock, unlockBlock } from '@/utils/helperFuncs';
import GaragePageModel from './garagePageModel';
import GaragePageView from './garagePageView';
import { Controller } from './types';

export default class GaragePageController implements Controller {
	public view: GaragePageView;
	public model: GaragePageModel;
	
	constructor() {
		this.model = new GaragePageModel();
		this.view = new GaragePageView();
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
		this.renderView();
		this.view.setUpdateBlockValues('', '#000000');
		lockBlock(this.view.updatingBlock);
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
		this.view.gameControllers.buttons.generateCarsButton.addEventListener(
			'click',
			() => this.generateCarsButtonHandler(),
		);
		this.view.tracksBlock.addEventListener(
			'click',
			(e) => this.tracksBlockHandler(e),
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
		).catch(error => {
			console.error(error);
		});
		this.view.setCreateBlockValues('', '#000000');
		this.renderView();
	}

	private async generateCarsButtonHandler(): Promise<void> {
		await this.model.generateRandomCars();
		this.renderView();
	}

	private paginationButtonsHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement && clickedElement.classList.contains('next-button')) {
			if (this.model.switchToNextPage()) this.renderView();
		} else if (clickedElement && clickedElement.classList.contains('previous-button')) {
			if (this.model.switchToPrevPage()) this.renderView();
		}
	}

	private tracksBlockHandler(e: MouseEvent) {
		const clickedElement = e.target as HTMLElement | null;
		if (clickedElement) {
			switch (clickedElement.id) {
				case 'select': this.selectButtonHandler(clickedElement);
					break;
				case 'remove': this.removeButtonHandler(clickedElement);
					break;
				case 'start':
					break;
				case 'stop':
					break;
			}
		}
	}

	private async selectButtonHandler(button: HTMLElement): Promise<void> {
		const track = button.closest('.track') as HTMLElement; // take parent element with class "track"
		const carData = await this.model.getCarData(track.id);
		if (carData) {
			const updatingBlock = this.view.updatingBlock;
			unlockBlock(updatingBlock);
			this.view.setUpdateBlockValues(carData.name, carData.color);
			this.model.selectedCarID = track.id;
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

	private async removeButtonHandler(button: HTMLElement): Promise<void> {
		const track = button.closest('.track') as HTMLElement; // take parent element with class "track"
		this.model.deleteCar(track.id);
		this.view.setUpdateBlockValues('', '#000000');
		lockBlock(this.view.updatingBlock);
		this.renderView();
	}
}