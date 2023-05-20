import MinefieldController from './minefieldController';
import createNode from '../helpers/createNode';
import { getSettingsWidgetLayout, getInterfaceLayout } from '../helpers/getInterfaceLayout';
import { defaultGameSettings, defaultColorTheme } from '../helpers/defaultGameSettings';

export default class GameController {
	constructor() {
		window.addEventListener('beforeunload', () => this.setGameSettings()); // TODO
		window.addEventListener('DOMContentLoaded', () => {
			this.getGameSettings();
			this.init();
		});
	}

	init() {
		/* create minefield */
		if (!this.gameSettings.minefield) {
			this.gameSettings.minefield = new MinefieldController(this.gameSettings);
		}
		this.setPageLayout();
		this.setEventListeners();
	}

	reloadGame() {
		this.gameSettings = { ...this.tempSettings };
		this.setGameSettings();
		document.querySelector('.wrapper').remove();
		this.init();
	}

	/* get game settings from local storage and writes it to this.gameSettings */
	getGameSettings() {
		this.gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
		if (this.gameSettings === null) this.gameSettings = defaultGameSettings;
		this.tempSettings = { ...this.gameSettings }; // object for writing temporary settings
		this.colorTheme = JSON.parse(localStorage.getItem('colorTheme'));
		if (this.colorTheme === null) this.colorTheme = defaultColorTheme;
	}

	/* write game settings to local storage */
	setGameSettings() {
		localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
		localStorage.setItem('colorTheme', JSON.stringify(this.colorTheme));
	}

	setPageLayout() {
		const wrapper = createNode('div', `wrapper ${this.colorTheme}`);
		const gameField = createNode('article', 'game-field');
		const pageHeader = createNode('h1', 'game-name');
		pageHeader.textContent = 'Minesweeper';
		gameField.insertAdjacentHTML('afterbegin', getInterfaceLayout(this.gameSettings));
		gameField.append(this.gameSettings.minefield.getMinefieldNode());
		wrapper.insertAdjacentHTML('afterbegin', getSettingsWidgetLayout(this.gameSettings, this.colorTheme));
		wrapper.append(pageHeader, gameField);
		document.body.prepend(wrapper);
	}
}
