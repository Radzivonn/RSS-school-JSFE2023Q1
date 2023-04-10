import { menuListenerToggle, headerMenuToggle, headerMenuInit } from '../../assets/js-modules/header-menu.js';
import { tabletBreakpoint } from '../../assets/js-modules/common-variables.js';
import { componentsState } from '../../assets/js-modules/components-state.js';
import { sliderInit } from '../../assets/js-modules/slider.js';

document.addEventListener("DOMContentLoaded", () => {
	if (window.screen.width < tabletBreakpoint) headerMenuInit();
	sliderInit();

	window.matchMedia("(max-width: 767px)").addEventListener('change', (e) => {
		/* header menu */
		if (e.target.matches === false && componentsState.headerMenu === true) headerMenuToggle();
		else if (e.target.matches === true && menuListenerToggle === false) headerMenuInit();
		/* header menu */
	});

	window.matchMedia("(min-width: 768px) and (max-width: 1200px)").addEventListener('change', (e) => {
		sliderInit(); // slider
	});
	/* mediaQuery change event */
});
