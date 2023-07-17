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
		await this.model.setRequestData();
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
		return componentView;
	}

	private bindListeners() {
		this.view.gameControllers.buttons.createCarButton.addEventListener(
			'click',
			() => this.createCarButtonHandler(),
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
		);
		const carsAmount = this.model.allCarsData.length;
		const pageNumber = this.model.pageNumber;
		const pagesAmount = Math.ceil(carsAmount / this.model.TRACKSPERPAGE);

		this.view.updatePageHeaders(carsAmount, pageNumber);
		if (pagesAmount === pageNumber) {
			this.view.updateTracksBlock(this.model.getDisplayedCarsData());
		}
	}

	private paginationButtonsHandler(e: MouseEvent) {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement && clickedElement.classList.contains('next-button')) {
			this.model.switchToNextPage();
			this.renderView();
		} else if (clickedElement && clickedElement.classList.contains('previous-button')) {
			this.model.switchToPrevPage();
			this.renderView();
		}
	}
}