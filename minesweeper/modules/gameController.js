import { getMinefieldNode } from '../helpers/getInterfaceLayout';
import {
  placeMines,
  countAllMinedNeighbors,
  allMinesFound,
  checkCell,
} from '../helpers/createMinefield';
import getCordinatesByID from '../helpers/getCordinatesByID';
import GameVue from './gameVue';
import GameModel from './gameModel';
import fieldSizes from '../constants/fieldSizes';
import { clickSoundURL, winSoundURL, loseSoundURL } from '../constants/sounds';

export default class GameController {
  constructor() {
    this.model = new GameModel();

    window.addEventListener('DOMContentLoaded', () => {
      this.model.getGameSettings();
    });
    window.addEventListener('unload', () => this.model.setGameSettings());

    setInterval(this.updateGameTimer.bind(this), 1000); // start timer
  }

  init() {
    this.model.getScore();
    GameVue.setPageLayout(
      this.model.gameSettings,
      this.model.minefield,
      this.model.colorTheme,
      this.model.score,
    );
    this.setEventListeners();

    if (this.model.gameSettings.gameState !== 'In progress') {
      this.toggleFinishModal();
    } else {
      this.model.startGameTimer();
    }
    GameVue.displayNeighborsAmount(this.model.minefield);
  }

  reloadGame() {
    this.model.updateScore();
    this.model.setScore();
    this.model.resetSettings();
    this.model.resetGameTimer();
    this.model.setGameSettings();
    document.querySelector('.wrapper').remove();
    this.init();
    GameVue.resetInterface(this.model.gameSettings.clicksAmount, this.model.gameSettings.gameTime);
  }

  setEventListeners() {
    const difficultyOptions = document.querySelectorAll(
      '.game-difficulty option',
    );
    const selectedDifficulty = document.querySelector(
      `option[value=${this.model.gameSettings.difficulty}]`,
    );
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
    minesAmountBar.addEventListener(
      'input',
      this.minesAmountHandler.bind(this),
    );

    const difficultyList = document.querySelector('.game-difficulty');
    difficultyList.addEventListener(
      'change',
      this.difficultyHandler.bind(this),
    );

    this.setFieldListener();
  }

  setFieldListener() {
    const minefield = document.querySelector('.mine-field');
    minefield.addEventListener('mousedown', this.fieldClicksHandler.bind(this));
  }

  updateGameTimer() {
    if (
      this.model.isTimerActive
      && this.model.gameSettings.isFirstMoveCompleted
    ) {
      this.model.gameSettings.gameTime += 1;
      GameVue.displayGameTime(this.model.gameSettings.gameTime);
    }
  }

  fieldClicksHandler(e) {
    if (
      this.model.gameSettings.gameState === 'In progress'
      && e.target.classList.contains('mine-field__cell')
      && !e.target.classList.contains('opened-cell')
    ) {
      // left button click
      if (e.button === 0) {
        this.openCell(e.target);
        this.model.gameSettings.clicksAmount += 1;
        GameVue.displayClicks(this.model.gameSettings.clicksAmount);
      } else if (e.button === 2 && this.model.gameSettings.isFirstMoveCompleted) {
        this.setFlag(e.target); // right button click
      }
      GameController.playSound(clickSoundURL);
    }
  }

  openCell(clickedCell) {
    const cellID = clickedCell.id;
    const [cordX, cordY] = getCordinatesByID(cellID);

    if (!this.model.gameSettings.isFirstMoveCompleted) this.firstMove(cellID);

    if (!this.model.minefield[cordY][cordX].isMarked) {
      const clickedCellNode = document.getElementById(`${cellID}`);
      clickedCellNode.classList.add('opened-cell');

      if (this.model.minefield[cordY][cordX].isMined === true) {
        this.model.minefield[cordY][cordX].isOpened = true;
        this.model.gameSettings.gameState = 'Lose';
        this.toggleFinishModal();
        GameController.playSound(loseSoundURL);
      } else {
        checkCell(this.model.minefield, cordY, cordX);
        if (allMinesFound(this.model.minefield, this.model.gameSettings.minesAmount)) {
          this.model.gameSettings.gameState = 'Won';
          this.toggleFinishModal();
          GameController.playSound(winSoundURL);
        }
      }
      GameVue.displayNeighborsAmount(this.model.minefield);
    }
  }

  firstMove(cellID) {
    this.model.gameSettings.isFirstMoveCompleted = true;
    this.model.minefield = placeMines(this.model.minefield, this.model.gameSettings, cellID);

    document.querySelector('.mine-field').remove();
    document
      .querySelector('.info-section')
      .after(getMinefieldNode(this.model.minefield));

    this.setFieldListener();
    this.model.minefield = countAllMinedNeighbors(this.model.minefield);
  }

  setFlag(clickedCell) {
    const [x, y] = getCordinatesByID(clickedCell.id);
    if (this.model.gameSettings.flagsCounter < this.model.gameSettings.minesAmount) {
      this.model.gameSettings.flagsCounter += this.model.minefield[y][x].isMarked ? -1 : 1;
      this.model.minefield[y][x].isMarked = !this.model.minefield[y][x].isMarked;
      clickedCell.classList.toggle('marked-cell');
    } else {
      if (this.model.minefield[y][x].isMarked) this.model.gameSettings.flagsCounter -= 1;
      this.model.minefield[y][x].isMarked = false;
      clickedCell.classList.remove('marked-cell');
    }
    GameVue.displayFlagsAmount(this.model.gameSettings.flagsCounter);
  }

  toggleFinishModal() {
    GameVue.displayFinishModal(this.model.gameSettings.gameState);
    this.model.minefield = this.model.minefield.map((row) => row.map(() => true));
    this.model.stopGameTimer();
  }

  settingsHandler(e) {
    const clickElem = e.target;
    if (clickElem.closest('.theme-toggle')) {
      this.model.colorTheme = GameVue.changeTheme(this.model.colorTheme);
    }
  }

  minesAmountHandler(e) {
    this.setMinesAmount(e.target.value);
  }

  setMinesAmount(amount) {
    GameVue.displayAllMinesAmount(amount);
    this.model.tempSettings.minesAmount = Number(amount);
  }

  difficultyHandler(e) {
    this.model.tempSettings.difficulty = e.target.value;
    this.model.tempSettings.fieldSize = fieldSizes[this.model.tempSettings.difficulty];
    this.setMinesAmount(this.model.tempSettings.fieldSize.minesAmount);
  }

  static async playSound(url) {
    // if (this.gameSettings.sound) {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play();
    // }
  }
}
