import { menuListenerToggle, headerMenuToggle, headerMenuInit } from '../../assets/js-modules/header-menu.js';
import { tabletBreakpoint } from '../../assets/js-modules/common-variables.js';
import { componentsState } from '../../assets/js-modules/components-state.js';

document.addEventListener("DOMContentLoaded", () => {
	if (window.screen.width < tabletBreakpoint) headerMenuInit();
	/* mediaQuery change event */
	window.matchMedia("(max-width: 767px)").addEventListener('change', (e) => {
		if (e.target.matches === false && componentsState.headerMenu === true) headerMenuToggle();
		else if (e.target.matches === true && menuListenerToggle === false) headerMenuInit();
	});
});
