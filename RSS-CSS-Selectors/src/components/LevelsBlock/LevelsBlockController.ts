import { IController } from "./types";
import LevelsBlockModel from "./LevelsBlockModel";
import LevelsBlockView from "./LevelsBlockView";
import { Level } from "@/utils/levels/levelTypes";
import { getEventElement } from "@/utils/helperFuncs";
import { CustomEvents } from "@/utils/customEvents";

export default class LevelsBlockController implements IController {
	public model: LevelsBlockModel;
	public view: LevelsBlockView;

	constructor() {
		this.model = new LevelsBlockModel();
		this.view = new LevelsBlockView(this.model.getLevels(), this.model.getCompletedLevels());
	}

	public init(): void {
		this.view.createView();
		this.changeLevel(this.model.getCurrentLevel());
		this.bindListeners();
	}

	private bindListeners(): void {
		this.view.buttons.menu.addEventListener('click', () => this.view.toggleLevelsMenu());
		this.view.buttons.prev.addEventListener('click', () => this.changeLevel(this.model.prevLevel()));
		this.view.buttons.next.addEventListener('click', () => this.changeLevel(this.model.nextLevel()));
		this.view.levelsBlock.addEventListener('click', (e) => this.setLevel(e));
		document.addEventListener(CustomEvents.LEVELCOMPLETED, () => this.levelCompleted(this.model.levelCompleted()));
		window.addEventListener('beforeunload', () => this.model.saveLevelOptions());
	}

	private levelCompleted(currentLevel: Level | string) {
		if (typeof currentLevel === 'string') this.view.gamePassed(currentLevel);
		else this.changeLevel(currentLevel);
	}

	private changeLevel(currentLevel: Level) {
		this.view.updateView(this.model.getLevels(), currentLevel, this.model.getCompletedLevels());
		document.dispatchEvent(
			new CustomEvent(CustomEvents.CHANGELEVEL, {
				detail: {
					currentLevel: currentLevel
				}
			})
		);
	}

	private setLevel(e: MouseEvent): void {
		const clickedElement = getEventElement(e, 'level');
		if (clickedElement) {
			const selectedLevel = this.model.changeLevel(Number(clickedElement.id.slice(6)));
			this.changeLevel(selectedLevel);
			this.view.toggleLevelsMenu();
		}
	}
}