import { getEmptyMinefield } from '../helpers/createMinefield';
import {
  defaultColorTheme,
  defaultGameSettings,
} from '../helpers/defaultGameSettings';

export default class GameModel {
  setGameSettings() {
    if (this.gameSettings) {
      localStorage.setItem('gameSettings', JSON.stringify(this.gameSettings));
    }
    if (this.minefield) {
      localStorage.setItem('minefield', JSON.stringify(this.minefield));
    }
    if (this.colorTheme) {
      localStorage.setItem('colorTheme', JSON.stringify(this.colorTheme));
    }
  }

  getGameSettings() {
    if (!localStorage.getItem('gameSettings')) {
      this.gameSettings = defaultGameSettings;
    } else {
      this.gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
    }
    this.tempSettings = structuredClone(this.gameSettings);

    if (!localStorage.getItem('colorTheme')) {
      this.colorTheme = defaultColorTheme;
    } else {
      this.colorTheme = JSON.parse(localStorage.getItem('colorTheme'));
    }

    if (localStorage.getItem('minefield')) {
      this.minefield = JSON.parse(localStorage.getItem('minefield'));
    } else {
      this.minefield = getEmptyMinefield(this.gameSettings);
    }
  }

  resetSettings() {
    this.gameSettings = structuredClone(this.tempSettings);
    this.minefield = getEmptyMinefield(this.gameSettings);
    this.gameSettings.clicksAmount = defaultGameSettings.clicksAmount;
    this.gameSettings.flagsCounter = 0;
    this.gameSettings.gameState = defaultGameSettings.gameState;
    this.gameSettings.isFirstMoveCompleted = false;
  }

  getScore() {
    if (!localStorage.getItem('score')) this.score = [];
    else this.score = JSON.parse(localStorage.getItem('score'));
  }

  setScore() {
    if (this.score) localStorage.setItem('score', JSON.stringify(this.score));
  }

  updateScore() {
    if (
      this.gameSettings.gameState !== 'In progress'
      && this.gameSettings.gameState === 'Won'
    ) {
      if (this.score.length > 9) this.score.shift();
      this.score.push(this.gameSettings);
    }
  }

  resetGameTimer() {
    this.gameSettings.gameTime = 0;
  }

  startGameTimer() {
    this.isTimerActive = true;
  }

  stopGameTimer() {
    this.isTimerActive = false;
  }
}
