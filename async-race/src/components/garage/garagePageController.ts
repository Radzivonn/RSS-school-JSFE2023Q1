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
		await this.model.setRequestData().catch(error => console.error(error));
		this.bindListeners();
	}

	private renderView(): void {
		this.view.updateView(
			this.model.pageNumber,
			this.model.allCarsData.length,
			this.model.getDisplayedCarsData(),
		);
	}

	public getView(): HTMLElement {
		const componentView = this.view.createView();
		this.renderView();
		lockBlock(this.view.updatingBlock);
		return componentView;
	}

	private bindListeners(): void {
		this.view.gameControllers.buttons.createCarButton.addEventListener(
			'click',
			() => this.createCarButtonHandler(),
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
			this.view.gameControllers.inputs.createCarInput.value,
			this.view.gameControllers.colorPalettes.createCarPalette.value,
		).catch(error => {
			console.error(error);
		});

		const carsAmount = this.model.allCarsData.length;
		const currentPageNumber = this.model.pageNumber;
		const pagesAmount = Math.ceil(carsAmount / this.model.TRACKSPERPAGE);

		this.view.updatePageHeaders(carsAmount, currentPageNumber);
		if (pagesAmount === currentPageNumber) {
			this.view.updateTracksBlock(this.model.getDisplayedCarsData());
		}
	}

	private async generateCarsButtonHandler(): Promise<void> {
		await this.model.generateRandomCars();
		this.renderView();
	}

	private paginationButtonsHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement && clickedElement.classList.contains('next-button')) {
			this.model.switchToNextPage();
			this.renderView();
		} else if (clickedElement && clickedElement.classList.contains('previous-button')) {
			this.model.switchToPrevPage();
			this.renderView();
		}
	}

	private tracksBlockHandler(e: MouseEvent) {
		const clickedElement = e.target as HTMLElement | null;
		if (clickedElement) {
			switch (clickedElement.id) {
				case 'select': this.selectButtonHandler(clickedElement);
					break;
				case 'remove':
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
		const { name, color } = await this.model.getCarData(track.id);
		if (name && color) {
			const updatingBlock = this.view.updatingBlock;
			unlockBlock(updatingBlock);
			this.view.gameControllers.inputs.updateCarInput.value = name;
			this.view.gameControllers.colorPalettes.updateCarPalette.value = color;
			this.model.selectedCarID = track.id;
			console.log(this.model.selectedCarID);
		}
	}
}