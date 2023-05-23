import createNode from '../helpers/createNode';
import {
	getSettingsWidgetLayout,
	getInterfaceLayout,
	getMinesCounterLayout,
	getMinefieldNode,
	getFinishModalLayout,
} from '../helpers/getInterfaceLayout';
import { defaultGameSettings, defaultColorTheme } from '../helpers/defaultGameSettings';
import { getEmptyMinefield, placeMines, countAllMinedNeighbors } from '../helpers/createMinefield';

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
		setInterval(this.updateGameTimer.bind(this), 1000); // start timer
	}

	init() {
		this.setPageLayout();
		this.setEventListeners();
		if (this.gameSettings.gameState !== 'In progress') {
			this.toggleFinishModal();
		} else {
			this.startGameTimer();
		}
		this.displayNeighborsAmount();
	}

	reloadGame() {
		this.resetSettings();
		this.resetGameTimer();
		this.setGameSettings();
		document.querySelector('.wrapper').remove();
		this.init();
		this.resetInterface();
	}

	resetSettings() {
		this.gameSettings = structuredClone(this.tempSettings);
		this.minefield = getEmptyMinefield(this.gameSettings);
		this.gameSettings.clicksAmount = defaultGameSettings.clicksAmount;
		this.gameSettings.gameState = defaultGameSettings.gameState;
		this.gameSettings.isFirstMoveCompleted = false;
	}

	resetInterface() {
		this.displayClicks();
		this.displayGameTime();
	}

	/* get game settings from local storage and writes it to this.gameSettings */
	getGameSettings() {
		if (!localStorage.getItem('gameSettings')) this.gameSettings = defaultGameSettings;
		else this.gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
		this.tempSettings = structuredClone(this.gameSettings); // object for writing temporary settings

		if (!localStorage.getItem('colorTheme')) this.colorTheme = defaultColorTheme;
		else this.colorTheme = JSON.parse(localStorage.getItem('colorTheme'));

		if (localStorage.getItem('minefield')) this.minefield = JSON.parse(localStorage.getItem('minefield'));
		else this.minefield = getEmptyMinefield(this.gameSettings);
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
		gameField.insertAdjacentHTML('afterbegin', getFinishModalLayout());
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

		document.querySelectorAll('.reset-button').forEach((button) => {
			button.addEventListener('click', () => this.reloadGame());
		});

		const settingsButton = document.querySelector('.settings-button');
		const settingsWidget = document.querySelector('.settings-modal');
		settingsButton.addEventListener('click', () => settingsWidget.classList.toggle('active'));
		settingsWidget.addEventListener('click', this.settingsHandler.bind(this));

		const minesAmountBar = document.querySelector('.change-mines-amount__bar');
		minesAmountBar.addEventListener('input', this.minesAmountHandler.bind(this));

		const difficultyList = document.querySelector('.game-difficulty');
		difficultyList.addEventListener('change', this.difficultyHandler.bind(this));

		this.setFieldListener();
	}

	setFieldListener() {
		const minefield = document.querySelector('.mine-field');
		minefield.addEventListener('click', this.fieldClicksHandler.bind(this));
	}

	startGameTimer() {
		this.isTimerActive = true;
	}

	updateGameTimer() {
		if (this.isTimerActive) {
			this.gameSettings.gameTime += 1;
			this.displayGameTime();
		}
	}

	resetGameTimer() {
		this.gameSettings.gameTime = 0;
	}

	stopGameTimer() {
		this.isTimerActive = false;
	}

	displayGameTime() {
		const gameTimeWidget = document.querySelector('.game-time');
		gameTimeWidget.textContent = +this.gameSettings.gameTime;
	}

	fieldClicksHandler(e) {
		if (
		this.gameSettings.gameState === 'In progress'
		&& e.target.classList.contains('mine-field__cell')
		&& !e.target.classList.contains('opened-cell')
		) {
			this.gameSettings.clicksAmount += 1;
			this.displayClicks();
			this.openCell(e.target);
		}
	}

	displayClicks() {
		const clicksAmountWidget = document.querySelector('.clicks-amount');
		clicksAmountWidget.textContent = this.gameSettings.clicksAmount;
	}

	openCell(clickedCell) {
		const cellID = clickedCell.id;
		const cordY = parseInt(cellID.slice(0, cellID.indexOf('.')), 10);
		const cordX = parseInt(cellID.slice(cellID.indexOf('.') + 1), 10);
		const clickedCellNode = document.getElementById(`${cellID}`);
		clickedCellNode.classList.add('opened-cell');

		if (!this.gameSettings.isFirstMoveCompleted) {
			this.gameSettings.isFirstMoveCompleted = true;
			this.minefield = placeMines(this.minefield, this.gameSettings);
			document.querySelector('.mine-field').remove();
			document.querySelector('.info-section').after(getMinefieldNode(this.minefield));
			this.setFieldListener();
			this.minefield = countAllMinedNeighbors(this.minefield);
		}

		if (this.minefield[cordY][cordX].isMined === true) {
			this.minefield[cordY][cordX].isOpened = true;
			this.gameSettings.gameState = 'Lose';
			this.toggleFinishModal();
		} else {
			this.checkCell(cordY, cordX);
		}

		this.displayNeighborsAmount();
	}

	checkCell(y, x) {
		const cell = this.minefield[y][x];
		if (this.isCellRelated(cell, y, x)) return;
		cell.isOpened = true;
		const cellNode = document.getElementById(`${y}.${x}`);
		cellNode.classList.add('opened-cell');
		for (let dy = -1; dy < 2; dy += 1) {
			for (let dx = -1; dx < 2; dx += 1) {
				if (Math.abs(dy - dx) === 1) {
					if (cell.minedNeighbors === 0) this.checkCell(y + dy, x + dx);
				}
			}
		}
	}

	isCellRelated(cell, y, x) {
		return cell.isOpened
			|| cell.isMined
			|| y < 1 || x < 1
			|| y > this.minefield.length - 2
			|| x > this.minefield[y].length - 2;
	}

	displayNeighborsAmount() {
		document.querySelectorAll('.mine-field__cell.opened-cell').forEach((cell) => {
			// cell.classList.add('opened-cell');
			const cellID = cell.id;
			const y = parseInt(cellID.slice(0, cellID.indexOf('.')), 10);
			const x = parseInt(cellID.slice(cellID.indexOf('.') + 1), 10);
			if (this.minefield[y][x].minedNeighbors > 0) {
				document.getElementById(cellID).textContent = this.minefield[y][x].minedNeighbors;
			}
		});
	}

	toggleFinishModal() {
		const finishGameModal = document.querySelector('.finish-modal');
		const finishMessage = document.querySelector('.finish-message');
		finishMessage.textContent = `You ${this.gameSettings.gameState}!!!`;
		finishGameModal.classList.add('active');
		this.stopGameTimer();
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
