import GaragePageController from './garage/garagePageController';
import WinnersController from './winners/winnersPageController';
import { createElement } from '@/utils/helperFuncs';

export default class App {
	private garagePage = new GaragePageController();
	private winnersPage = new WinnersController();
	private rootNode = createElement({ tag: 'div', classNames: ['app'] });
	private routingButtons = createElement({ tag: 'nav', classNames: ['nav-buttons'] });

	public async init(): Promise<void> {
		await this.garagePage.init();
		await this.winnersPage.init();

		this.switchPage(this.garagePage.getView());
		this.routingButtons.append(...this.createNavigationButtons());
		document.body.append(
			this.routingButtons,
			this.rootNode,
		);

		this.bindListeners();
	}

	private bindListeners(): void {
		this.routingButtons.addEventListener('click', (e) => this.routingButtonsHandler(e));
	}

	private async routingButtonsHandler(e: Event): Promise<void> {
		const clickedElement = e.target as HTMLElement;
		if (clickedElement) {
			const clickedButton = clickedElement.closest('.nav-button');
			if (clickedButton && clickedButton.id === 'toGarage') {
				this.switchPage(this.garagePage.getView());
			} else if (clickedButton && clickedButton.id === 'toWinners') {
				this.switchPage(this.winnersPage.getView());
			}
		}
	}

	private switchPage(pageView: HTMLElement): void {
		this.rootNode.replaceChildren(pageView);
	}

	private createNavigationButtons(): HTMLElement[] {
		return [
			createElement({ tag: 'button', classNames: ['button', 'nav-button'], id: 'toGarage', text: 'to garage' }),
			createElement({ tag: 'button', classNames: ['button', 'nav-button'], id: 'toWinners', text: 'to winners' }),
		];
	}
}