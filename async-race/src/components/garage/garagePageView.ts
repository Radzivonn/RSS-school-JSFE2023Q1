import { View } from './types';
import { createCarImg, createElement, createPaginationButtons } from '@/utils/helperFuncs';
import { ResponseCarData, AllCarsData } from '@/utils/commonTypes';

export default class GaragePageView implements View {
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
					{ attrName: 'disabled', attrValue: 'true' },
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
					{ attrName: 'disabled', attrValue: 'true' },
				],
			}) as HTMLInputElement,
		},
		buttons: {
			createCarButton: createElement({ tag: 'button', classNames: ['button', 'create-block__button'], text: 'create' }),
			updateCarButton: createElement({
				tag: 'button',
				classNames: ['button', 'update-block__button'],
				text: 'update',
				attrs: [{ attrName: 'disabled', attrValue: 'true' }],
			}),
			raceButton: createElement({ tag: 'button', classNames: ['button', 'race-button'], text: 'race' }),
			resetButton: createElement({ tag: 'button', classNames: ['button', 'reset-button'], text: 'reset' }),
			generateCarsButton: createElement({ tag: 'button', classNames: ['button', 'generate-cars-button'], text: 'generate cars' }),
		},
	};

	public switchButtonsBlock = createElement({ tag: 'div', classNames: ['switch-buttons'] });

	constructor() {
		this.switchButtonsBlock.append(...createPaginationButtons());
	}

	public createView(): HTMLElement {
		const garageNode = createElement({ tag: 'div', classNames: ['garage'] });

		garageNode.append(
			this.createCarsCreatorBlock(),
			this.createRaceBlock(),
			this.switchButtonsBlock,
		);
		return garageNode;
	}

	private createCarsCreatorBlock(): HTMLElement {
		const carsCreatorNode = createElement({ tag: 'div', classNames: ['cars-creator'] });
		const createBlock = createElement({ tag: 'div', classNames: ['create-block'] });
		const updateBlock = createElement({ tag: 'div', classNames: ['update-block'] });
		const controlButtons = createElement({ tag: 'div', classNames: ['control-buttons'] }); 
		createBlock.append(
			this.gameControllers.inputs.createCarInput,
			this.gameControllers.colorPalettes.createCarPalette,
			this.gameControllers.buttons.createCarButton,
		);
		updateBlock.append(
			this.gameControllers.inputs.updateCarInput,
			this.gameControllers.colorPalettes.updateCarPalette,
			this.gameControllers.buttons.updateCarButton,
		);
		controlButtons.append(
			this.gameControllers.buttons.raceButton,
			this.gameControllers.buttons.resetButton,
			this.gameControllers.buttons.generateCarsButton,
		);
		carsCreatorNode.append(createBlock, updateBlock, controlButtons);
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

	private createTracksForPage(carsData: AllCarsData): HTMLElement[] {
		return carsData.map(carData => this.createTrack(carData));
	}

	private createTrack(carData: ResponseCarData): HTMLElement {
		const track = createElement({ tag: 'div', classNames: ['track'] });
		const carButtons = createElement({ tag: 'div', classNames: ['car-buttons'] });
		const carControlButtons = createElement({ tag: 'div', classNames: ['car-control-buttons'] });
		const highway = createElement({ tag: 'div', classNames: ['highway'] });
		
		carButtons.append(
			createElement({ tag: 'button', classNames: ['button', 'select-button'], text: 'select' }),
			createElement({ tag: 'button', classNames: ['button', 'remove-button'], text: 'remove' }),
			createElement({ tag: 'p', classNames: ['car-name'], text: carData.name }),
		);
		carControlButtons.append(
			createElement({ tag: 'button', classNames: ['button', 'start-button'], text: 'start' }),
			createElement({ tag: 'button', classNames: ['button', 'stop-button'], text: 'stop' }),
		);
		highway.append(createElement({ tag: 'div', classNames: ['finish'] }));
		
		track.append(
			carButtons,
			carControlButtons,
			createCarImg(carData.color),
			highway,
		);
		return track;
	}

	public updateView(pageNumber: number, allCarsAmount: number, carsData: AllCarsData): void {
		this.updatePageHeaders(allCarsAmount, pageNumber);
		this.updateTracksBlock(carsData);
	}

	public updatePageHeaders(allCarsAmount: number, pageNumber: number) {
		this.carsAmount.textContent = ` ${allCarsAmount}`;
		this.pageNumber.textContent = `${pageNumber}`;
	}

	public updateTracksBlock(carsData: AllCarsData): void {
		this.tracksBlock.replaceChildren(...this.createTracksForPage(carsData));
	}
}