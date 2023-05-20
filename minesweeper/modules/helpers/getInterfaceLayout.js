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
		<output class="range-value"> ${gameSettings.minesAmount} </output>
	</div>
	<select class="game-difficulty">
		<option class="game-difficulty__option" value="easy"> easy </option>
		<option class="game-difficulty__option" value="medium"> medium </option>
		<option class="game-difficulty__option" value="hard"> hard</option>
	</select>
</div>`;

export const getInterfaceLayout = (gameSettings) => `
<section class="info-section">
	<output class="mines-amount"> ${gameSettings.minesAmount} </output>
	<button class="reset-button"> new game </button>
	<time class="game-time"> ${gameSettings.gameTime} </time>
	<div class="settings-button"></div>
</section>`;
