import WinnersPageModel from './winnersPageModel';
import WinnersPageView from './winnersPageView';
import { Controller } from './types';

export default class WinnersController implements Controller {
	public view: WinnersPageView;
	public model: WinnersPageModel;

	constructor() {
		this.model = new WinnersPageModel();
		this.view = new WinnersPageView();
	}

	public async init(): Promise<void> {
		this.bindListeners();
	}

	public getView(): HTMLElement {
		const componentView = this.view.createView();
		this.renderView();
		return componentView;
	}

	private async renderView(): Promise<void> {
		const winnersData = await this.model.getDisplayedWinnersData();
		const carsData = await this.model.getDisplayedCarsData();
		this.view.updateView(
			this.model.pageNumber,
			this.model.winnersAmount,
			winnersData,
			carsData,
		);
	}

	private bindListeners() {
		this.view.switchButtonsBlock.addEventListener(
			'click',
			(e) => this.paginationButtonsHandler(e),
		);
	}

	private paginationButtonsHandler(e: MouseEvent): void {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement && clickedElement.classList.contains('next-button')) {
			if (this.model.switchToNextPage()) this.renderView();
		} else if (clickedElement && clickedElement.classList.contains('previous-button')) {
			if (this.model.switchToPrevPage()) this.renderView();			
		}
	}
}