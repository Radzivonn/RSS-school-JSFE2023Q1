import { componentsState } from '../../assets/js-modules/components-state.js';

const menuButton = document.querySelector('.menu-icon');
const menuBG = document.querySelector('.menuBG');
export let menuListenerToggle = false;

export const headerMenuToggle = () => {
	document.body.classList.toggle('_lock');
	menuBG.classList.toggle('active');
	menuButton.classList.toggle('active');
	componentsState.headerMenu = !componentsState.headerMenu;
}

export const headerMenuInit = () => {
	if (menuButton) {
		menuButton.addEventListener('click', headerMenuToggle);
		menuBG.addEventListener('click', (e) => {
			if (!e.target.closest('.menu') || (componentsState.headerMenu === true && e.target.closest('.menu-item'))) {
				document.body.classList.remove('_lock');
				menuBG.classList.remove('active');
				menuButton.classList.remove('active');
				componentsState.headerMenu = false;
			} // закрыть меню, если кликнули за его пределами
		});
		menuListenerToggle = true;
	}
}