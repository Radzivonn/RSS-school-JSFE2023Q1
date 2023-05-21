import createNode from '../helpers/createNode';
import {
 getSettingsWidgetLayout, getInterfaceLayout, getMinesCounterLayout, getMinefieldNode,
} from '../helpers/getInterfaceLayout';
import { defaultGameSettings, defaultColorTheme } from '../helpers/defaultGameSettings';
import getMinefieldState from '../helpers/createMinefield';

const fieldSizes = {
	easy: {
		sizeX: 10,
		sizeY: 10,
		minesAmount: 10,
	},
	medium: {
		sizeX: 15,
		sizeY: 15,
		minesAmount: 55,
	},
	hard: {
		sizeX: 25,
		sizeY: 25,
		minesAmount: 99,
	},
};

export default class GameController {
	constructor() {
		window.addEventListener('DOMContentLoaded', () => {
			this.getGameSettings();
			this.init();
		});
		window.addEventListener('unload', () => this.setGameSettings()); // TODO
	}

	init() {
		this.setPageLayout();
		this.setEventListeners();
	}

	reloadGame() {
		this.gameSettings = structuredClone(this.tempSettings);
		this.minefield = getMinefieldState(this.gameSettings);
		this.setGameSettings();
		document.querySelector('.wrapper').remove();
		this.init();
	}

	/* get game settings from local storage and writes it to this.gameSettings */
	getGameSettings() {
		if (!localStorage.getItem('gameSettings')) this.gameSettings = defaultGameSettings;
		else this.gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
		this.tempSettings = structuredClone(this.gameSettings); // object for writing temporary settings

		if (!localStorage.getItem('colorTheme')) this.colorTheme = defaultColorTheme;
		else this.colorTheme = JSON.parse(localStorage.getItem('colorTheme'));

		if (localStorage.getItem('minefield')) this.minefield = JSON.parse(localStorage.getItem('minefield'));
		else this.minefield = getMinefieldState(this.gameSettings);
	}

	/* write game settings to local storage */
	setGameSettings() {
		if (this.gameSettings) localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
		if (this.minefield) localStorage.setItem('minefield', JSON.stringify(this.minefield));
		if (this.colorTheme) localStorage.setItem('colorTheme', JSON.stringify(this.colorTheme));
	}

	setPageLayout() {
		const settings = this.gameSettings;
		const wrapper = createNode('div', `wrapper ${this.colorTheme}`);
		const gameField = createNode('article', 'game-field');
		const pageHeader = createNode('h1', 'game-name');
		pageHeader.textContent = 'Minesweeper';
		gameField.insertAdjacentHTML('afterbegin', getSettingsWidgetLayout(settings, this.colorTheme));
		gameField.insertAdjacentHTML('beforeend', getInterfaceLayout(settings));
		gameField.append(getMinefieldNode(this.minefield));
		gameField.insertAdjacentHTML('beforeend', getMinesCounterLayout(settings));
		wrapper.append(pageHeader, gameField);
		document.body.prepend(wrapper);
	}
}
