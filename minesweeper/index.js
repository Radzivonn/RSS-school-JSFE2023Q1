import './style/main.scss';
import GameController from './modules/gameController';

const game = new GameController();

window.addEventListener('DOMContentLoaded', () => game.init());
