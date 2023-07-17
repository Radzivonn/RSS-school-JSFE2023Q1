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

	public getView(): HTMLElement {
		return this.view.createView(
			this.model.pageNumber,
			this.model.allCarsData.length,
			this.model.getDisplayedCarsData(),
		);
	}

	private bindListeners() {
		this.view.gameControllers.buttons.createCarButton.addEventListener(
			'click',
			() => this.createCarButtonHandler(),
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
}