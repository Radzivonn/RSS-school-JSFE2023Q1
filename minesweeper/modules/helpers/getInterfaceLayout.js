import createNode from './createNode';

const lightThemeIconPath = require('../../assets/svg/light-theme-icon.svg');
const darkThemeIconPath = require('../../assets/svg/dark-theme-icon.svg');

export const getSettingsWidgetLayout = (gameSettings, colorTheme) => `
<div class="settings-modal">
	<div class="theme-toggle">
		<p> theme </p>
		<img class="theme-icon ${colorTheme === 'light' ? 'active' : ''}" id="light-theme" src=${lightThemeIconPath} alt="icon">
		<img class="theme-icon ${colorTheme === 'dark' ? 'active' : ''}" id="dark-theme" src=${darkThemeIconPath} alt="icon">
	</div>
	<div class="change-mines-amount">
		<p> Mines amount </p>
		<input class="change-mines-amount__bar" type="range" min="10" max="99" step="1" value="${gameSettings.minesAmount}">
		<output class="mines-amount"> ${gameSettings.minesAmount} </output>
	</div>
	<select class="game-difficulty">
		<option class="game-difficulty__option" value="easy"> easy </option>
		<option class="game-difficulty__option" value="medium"> medium </option>
		<option class="game-difficulty__option" value="hard"> hard</option>
	</select>
</div>`;

export const getInterfaceLayout = (gameSettings) => `
<section class="info-section">
	<output class="clicks-amount"> ${gameSettings.clicksAmount} </output>
	<button class="reset-button"> new game </button>
	<time class="game-time"> ${gameSettings.gameTime} </time>
	<div class="settings-button"></div>
</section>`;

export const getMinesCounterLayout = (gameSettings) => `
	<output class="mines-counter"> Mines ${gameSettings.minesAmount} </output>`;

export const getMinefieldNode = (minefield) => {
	const minefieldSection = createNode('section', 'mine-field');

	Object.entries(minefield).forEach(([rowID, rowObject]) => {
		const rowNode = createNode('div', 'mine-field__row');

		Object.entries(rowObject).forEach(([cellID, cellObject]) => {
			const cellNode = createNode('div', 'mine-field__cell');
			cellNode.id = ''.concat(rowID, '.', cellID);
			if (cellObject.isMined === true) cellNode.classList.add('mined-cell');
			else if (cellObject.isOpened === true) cellNode.classList.add('opened-cell');
			rowNode.append(cellNode);
		});

		minefieldSection.append(rowNode);
	});

	return minefieldSection;
};

export const getFinishModalLayout = () => `
<div class="finish-modal">
	<h2 class="finish-message"></h2>
	<button class="reset-button"> new game </button>
</div>`;
