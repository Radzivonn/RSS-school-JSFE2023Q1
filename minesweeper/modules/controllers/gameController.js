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
		this.startGameTimer();
	}

	reloadGame() {
		this.gameSettings = structuredClone(this.tempSettings);
		this.minefield = getMinefieldState(this.gameSettings);
		this.gameSettings.clicksAmount = 0;
		this.setGameSettings();
		document.querySelector('.wrapper').remove();
		this.init();
		this.displayClicks();
		this.resetGameTimer();
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

	setEventListeners() {
		const difficultyOptions = document.querySelectorAll('.game-difficulty option');
		const selectedDifficulty = document.querySelector(`option[value=${this.gameSettings.difficulty}]`);
		difficultyOptions.forEach((elem) => elem.removeAttribute('selected'));
		selectedDifficulty.setAttribute('selected', '');

		document.querySelector('.reset-button').addEventListener('click', () => this.reloadGame());

		const settingsButton = document.querySelector('.settings-button');
		const settingsWidget = document.querySelector('.settings-modal');
		settingsButton.addEventListener('click', () => settingsWidget.classList.toggle('active'));
		settingsWidget.addEventListener('click', this.settingsHandler.bind(this));

		const minesAmountBar = document.querySelector('.change-mines-amount__bar');
		minesAmountBar.addEventListener('input', this.minesAmountHandler.bind(this));

		const difficultyList = document.querySelector('.game-difficulty');
		difficultyList.addEventListener('change', this.difficultyHandler.bind(this));

		const minefield = document.querySelector('.mine-field');
		minefield.addEventListener('click', this.fieldClicksHandler.bind(this));
	}

	startGameTimer() {
		this.timer = setInterval(this.updateGameTimer.bind(this), 1000);
	}

	updateGameTimer() {
		this.gameSettings.gameTime += 1;
		this.displayGameTime();
	}

	resetGameTimer() {
		this.gameSettings.gameTime = 0;
		this.displayGameTime();
		clearInterval(this.timer);
	}

	displayGameTime() {
		const gameTimeWidget = document.querySelector('.game-time');
		gameTimeWidget.textContent = +this.gameSettings.gameTime;
	}

	fieldClicksHandler() {
		this.gameSettings.clicksAmount += 1;
		this.displayClicks();
	}

	displayClicks() {
		const clicksAmountWidget = document.querySelector('.clicks-amount');
		clicksAmountWidget.textContent = this.gameSettings.clicksAmount;
	}

	settingsHandler(e) {
		const clickElem = e.target;
		if (clickElem.closest('.theme-toggle')) {
			const themeIcons = document.querySelectorAll('.theme-icon');
			themeIcons.forEach((elem) => elem.classList.remove('active'));
			document.querySelector('.wrapper').classList.remove(`${this.colorTheme}`);

			this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
			document.getElementById(`${this.colorTheme}-theme`).classList.add('active');
			document.querySelector('.wrapper').classList.add(`${this.colorTheme}`);
		}
	}

	minesAmountHandler(e) {
		this.setMinesAmount(e.target.value);
	}

	setMinesAmount(amount) {
		const minesAmountDisplay = document.querySelector('.mines-amount');
		minesAmountDisplay.textContent = amount;
		this.tempSettings.minesAmount = Number(amount);
	}

	difficultyHandler(e) {
		this.tempSettings.difficulty = e.target.value;
		this.tempSettings.fieldSize = fieldSizes[this.tempSettings.difficulty];
		this.setMinesAmount(this.tempSettings.fieldSize.minesAmount);
	}
}
