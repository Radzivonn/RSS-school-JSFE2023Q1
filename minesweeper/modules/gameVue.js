import createNode from '../helpers/createNode';
import getCordinatesByID from '../helpers/getCordinatesByID';
import {
  getSettingsWidgetLayout,
  getInterfaceLayout,
  getMinesCounterLayout,
  getMinefieldNode,
  getFinishModalLayout,
  getScoreLayout,
} from '../helpers/getInterfaceLayout';

export default class GameVue {
  static setPageLayout(gameSettings, minefield, colorTheme, score) {
    const wrapper = createNode('div', `wrapper ${colorTheme}`);
    const gameField = createNode('article', 'game-field');
    const pageHeader = createNode('h1', 'game-name');
    pageHeader.textContent = 'Minesweeper';
    gameField.insertAdjacentHTML('afterbegin', getFinishModalLayout());
    gameField.insertAdjacentHTML(
      'afterbegin',
      getSettingsWidgetLayout(gameSettings, colorTheme),
    );
    gameField.insertAdjacentHTML('beforeend', getInterfaceLayout(gameSettings));
    gameField.append(getMinefieldNode(minefield));
    gameField.insertAdjacentHTML('beforeend', getMinesCounterLayout(gameSettings));
    gameField.insertAdjacentHTML('beforeend', getScoreLayout(score));
    wrapper.append(pageHeader, gameField);
    document.body.prepend(wrapper);
  }

  static displayGameTime(gameTime) {
    const gameTimeWidget = document.querySelector('.game-time');
    gameTimeWidget.textContent = +gameTime;
  }

  static displayClicks(clicksAmount) {
    const clicksAmountWidget = document.querySelector('.clicks-amount');
    clicksAmountWidget.textContent = clicksAmount;
  }

  static displayFlagsAmount(flagsCounter) {
    const flagsAmountWidget = document.querySelector('.flags-counter');
    flagsAmountWidget.textContent = `Flags ${flagsCounter}`;
  }

  static displayNeighborsAmount(minefield) {
    document
      .querySelectorAll('.mine-field__cell.opened-cell')
      .forEach((cell) => {
        const cellID = cell.id;
        const [x, y] = getCordinatesByID(cellID);
        const { minedNeighbors } = minefield[y][x];
        if (minedNeighbors > 0) {
          // eslint-disable-next-line no-param-reassign
          cell.textContent = minedNeighbors;
          cell.classList.add(`neighbors-${minedNeighbors}`);
        }
      });
  }

  static openAllCells() {
    document.querySelectorAll('.mine-field__cell').forEach((cell) => {
        if (!cell.classList.contains('opened-cell')) cell.classList.add('opened-cell');
    });
  }

  static displayFinishModal(gameState) {
    GameVue.openAllCells();
    const finishGameModal = document.querySelector('.finish-modal');
    const finishMessage = document.querySelector('.finish-message');
    finishMessage.textContent = `You ${gameState}!!!`;
    finishGameModal.classList.add('active');
  }

  static displayAllMinesAmount(amount) {
    const minesAmountDisplay = document.querySelector('.mines-amount');
    minesAmountDisplay.textContent = amount;
  }

  static changeTheme(colorTheme) {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach((elem) => elem.classList.remove('active'));
    document.querySelector('.wrapper').classList.remove(`${colorTheme}`);

    const newColorTheme = colorTheme === 'light' ? 'dark' : 'light';

    document
      .getElementById(`${newColorTheme}-theme`)
      .classList.add('active');
    document.querySelector('.wrapper').classList.add(`${newColorTheme}`);

    return newColorTheme;
  }

  static resetInterface(clicksAmount, gameTime) {
    GameVue.displayClicks(clicksAmount);
    GameVue.displayGameTime(gameTime);
  }
}
