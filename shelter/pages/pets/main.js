import { menuListenerToggle, headerMenuToggle, headerMenuInit } from '../../assets/js-modules/header-menu.js';
import { tabletBreakpoint } from '../../assets/js-modules/common-variables.js';
import { openModalWindow } from '../../assets/js-modules/common-functions.js';
import { componentsState } from '../../assets/js-modules/components-state.js';
import { pageSwitcher } from  '../../assets/js-modules/pagination.js';

const petsBlock = document.querySelector('.pets-list');

document.addEventListener("DOMContentLoaded", () => {
	if (window.screen.width < tabletBreakpoint) headerMenuInit();
	pageSwitcher();
	petsBlock.addEventListener('click', openModalWindow);
	
	window.matchMedia("(max-width: 767px)").addEventListener('change', (e) => {
		/* header menu */
		if (e.target.matches === false && componentsState.headerMenu === true) headerMenuToggle();
		else if (e.target.matches === true && menuListenerToggle === false) headerMenuInit();
		/* header menu */
	});
	window.matchMedia("(min-width: 663px) and (max-width: 965px)").addEventListener('change', (e) => {
		pageSwitcher(true);
	});
});

	// const paginationDeck = getPaginationDeck(DECK_LENGTH);
	// petsBlock.insertAdjacentHTML('afterbegin', getPageCards(currentPageNumber));
	// pageValidation(currentPageNumber);
	// console.log(paginationDeck);