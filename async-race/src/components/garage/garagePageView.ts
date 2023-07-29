import { View } from './types';
import {
createCarNode,
createElement,
createPaginationButtons,
disableBlock,
enableBlock,
} from '@/utils/helperFuncs';
import { ResponseCarData, ListOfCarsData } from '@/utils/commonTypes';

export default class GaragePageView implements View {
	public routingButtons: HTMLElement;
	public creatingBlock = createElement({ tag: 'div', classNames: ['create-block'] });
	public updatingBlock = createElement({ tag: 'div', classNames: ['update-block'] });
	public controlButtonsBlock = createElement({ tag: 'div', classNames: ['control-buttons'] }); 
	public carsAmount = createElement({ tag: 'output', classNames: ['cars-number'] });
	public pageNumber = createElement({ tag: 'output', classNames: ['page-number'] });
	public tracksBlock = createElement({ tag: 'div', classNames: ['tracks-block'] });
	public gameControllers = {
		inputs: {
			createCarInput: createElement({
				tag: 'input',
				classNames: ['text-input', 'create-block__input'],
				attrs: [{ attrName: 'type', attrValue: 'text' }],
			}) as HTMLInputElement,
			updateCarInput: createElement({
				tag: 'input',
				classNames: ['text-input', 'update-block__input'],
				attrs: [
					{ attrName: 'type', attrValue: 'text' },
				],
			}) as HTMLInputElement,
		},

		colorPalettes: {
			createCarPalette: createElement({
				tag: 'input',
				classNames: ['color-palette', 'create-block__colorPalette'],
				attrs: [{ attrName: 'type', attrValue: 'color' }],
			}) as HTMLInputElement,
			updateCarPalette: createElement({
				tag: 'input',
				classNames: ['color-palette', 'update-block__colorPalette'],
				attrs: [
					{ attrName: 'type', attrValue: 'color' },
				],
			}) as HTMLInputElement,
		},

		buttons: {
			createCarButton: createElement({ tag: 'button', classNames: ['button', 'create-block__button'], text: 'create' }),
			updateCarButton: createElement({
				tag: 'button',
				classNames: ['button', 'update-block__button'],
				text: 'update',
			}),
			raceButton: createElement({ tag: 'button', classNames: ['button', 'race-button'], text: 'race' }),
			resetButton: createElement({
				tag: 'button',
				classNames: ['button', 'reset-button'],
				attrs: [ { attrName: 'disabled', attrValue: '' }],
				text: 'reset',
			}),
			generateCarsButton: createElement({ tag: 'button', classNames: ['button', 'generate-cars-button'], text: 'generate cars' }),
		},
	};
	public winnerMessage = createElement({ tag: 'h1', classNames: ['win-message'] });
	public switchButtonsBlock = createElement({ tag: 'div', classNames: ['switch-buttons'] });

	constructor(routingButtons: HTMLElement) {
		this.switchButtonsBlock.append(...createPaginationButtons());
		this.routingButtons = routingButtons;
	}

	public createView(): HTMLElement {
		const garageNode = createElement({ tag: 'div', classNames: ['garage'] });

		garageNode.append(
			this.createCarsCreatorBlock(),
			this.createRaceBlock(),
			this.switchButtonsBlock,
			this.winnerMessage,
		);
		return garageNode;
	}

	private createCarsCreatorBlock(): HTMLElement {
		const carsCreatorNode = createElement({ tag: 'div', classNames: ['cars-creator'] });
		this.creatingBlock.append(
			this.gameControllers.inputs.createCarInput,
			this.gameControllers.colorPalettes.createCarPalette,
			this.gameControllers.buttons.createCarButton,
		);
		this.updatingBlock.append(
			this.gameControllers.inputs.updateCarInput,
			this.gameControllers.colorPalettes.updateCarPalette,
			this.gameControllers.buttons.updateCarButton,
		);
		this.controlButtonsBlock.append(
			this.gameControllers.buttons.raceButton,
			this.gameControllers.buttons.resetButton,
			this.gameControllers.buttons.generateCarsButton,
		);
		carsCreatorNode.append(this.creatingBlock, this.updatingBlock, this.controlButtonsBlock);
		return carsCreatorNode;
	}

	private createRaceBlock(): HTMLElement {
		const raceNode = createElement({ tag: 'div', classNames: ['race-block'] });
		const garageHeader = createElement({ tag: 'h2', classNames: ['garage-header'], text: 'Garage' });
		const trackPageHeader = createElement({ tag: 'h3', classNames: ['track-block-header'], text: 'Page #' });

		garageHeader.append(this.carsAmount);
		trackPageHeader.append(this.pageNumber);
		raceNode.append(
			garageHeader,
			trackPageHeader,
			this.tracksBlock,
		);
		return raceNode;
	}

	private createTracksForPage(carsData: ListOfCarsData): HTMLElement[] {
		return carsData.map(carData => this.createTrack(carData));
	}

	private createTrack(carData: ResponseCarData): HTMLElement {
		const track = createElement({ tag: 'div', classNames: ['track'], id: String(carData.id) });
		const carButtons = createElement({ tag: 'div', classNames: ['car-buttons'] });
		const carControlButtons = createElement({ tag: 'div', classNames: ['car-control-buttons'] });
		const highway = createElement({ tag: 'div', classNames: ['highway'] });
		
		carButtons.append(
			createElement({
				tag: 'button',
				classNames: ['button', 'select-button'],
				id: 'select',
				text: 'select',
			}),
			createElement({
				tag: 'button',
				classNames: ['button', 'remove-button'],
				id: 'remove',
				text: 'remove',
			}),
			createElement({ tag: 'p', classNames: ['car-name'], text: carData.name }),
		);

		carControlButtons.append(
			createElement({
				tag: 'button',
				classNames: ['button', 'start-button'],
				id: 'start',
				text: 'start',
			}),
			createElement({
				tag: 'button',
				classNames: ['button', 'stop-button'],
				id: 'stop',
				attrs: [ { attrName: 'disabled', attrValue: '' } ],
				text: 'stop',
			}),
		);
		highway.append(createElement({ tag: 'div', classNames: ['finish'] }));
		
		track.append(
			carButtons,
			carControlButtons,
			createCarNode(carData.color),
			highway,
		);
		return track;
	}

	public updateView(pageNumber: number, carsAmount: number, carsData: ListOfCarsData): void {
		enableBlock(this.routingButtons);
		this.updatePageHeaders(carsAmount, pageNumber);
		this.updateTracksBlock(carsData);
	}

	public updatePageHeaders(carsAmount: number, pageNumber: number) {
		this.carsAmount.textContent = ` ${carsAmount}`;
		this.pageNumber.textContent = `${pageNumber}`;
		this.resetWinnerMessage();
	}

	public updateTracksBlock(carsData: ListOfCarsData): void {
		this.tracksBlock.replaceChildren(...this.createTracksForPage(carsData));
	}

	public updateTrack(carData: ResponseCarData): void {
		const trackNode = document.getElementById(String(carData.id));
		if (trackNode) {
			const carNode = trackNode.querySelector('.car') as HTMLElement;
			const carNameNode = trackNode.querySelector('.car-name') as HTMLElement;
			carNameNode.textContent = carData.name;
			carNode.style.fill = carData.color;
			this.setUpdateFormValues('', '#000000');
		}
	}

	public setCreateFormValues(inputText: string, color: string): void {
		this.gameControllers.inputs.createCarInput.value = inputText;
		this.gameControllers.colorPalettes.createCarPalette.value = color;
	}

	public setUpdateFormValues(inputText: string, color: string): void {
		this.gameControllers.inputs.updateCarInput.value = inputText;
		this.gameControllers.colorPalettes.updateCarPalette.value = color;
	}

	public setCarControlsDuringMove(carID: string): void {
		const track = document.getElementById(carID) as HTMLElement; // take parent element with class "track"
		const carButtons = track.querySelector('.car-buttons') as HTMLElement;
		track.querySelector('.start-button')?.setAttribute('disabled', '');
		track.querySelector('.stop-button')?.removeAttribute('disabled');
		disableBlock(carButtons);
		this.gameControllers.buttons.raceButton.setAttribute('disabled', '');
		this.gameControllers.buttons.resetButton.removeAttribute('disabled');
		disableBlock(carButtons, this.routingButtons, this.switchButtonsBlock);
	}

	public setCarControlsDuringParking(carID: string): void {
		const track = document.getElementById(carID) as HTMLElement; // take parent element with class "track"
		const carButtons = track.querySelector('.car-buttons') as HTMLElement;
		track.querySelector('.start-button')?.removeAttribute('disabled');
		track.querySelector('.stop-button')?.setAttribute('disabled', '');
		enableBlock(carButtons);
	}

	public putCarBack(car: HTMLElement): void {
		car.style.transform = 'translateX(0px)';
	}

	public writeWinnerMessage(message: string): void {
		this.winnerMessage.textContent = message;
	}

	public resetWinnerMessage(): void {
		this.winnerMessage.textContent = '';
	}
}