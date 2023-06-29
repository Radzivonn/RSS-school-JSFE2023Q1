import { IController } from "./types";
import LevelsBlockModel from "./LevelsBlockModel";
import LevelsBlockView from "./LevelsBlockView";
import { LayoutExampleController } from '@/components/LayoutExample/LayoutExampleController';
import { Level, LevelsList } from "@/utils/levelTypes";

export default class LevelsBlockController implements IController {
	public model: LevelsBlockModel;
	public view: LevelsBlockView;
	private layoutExample: LayoutExampleController;
	constructor() {
		this.model = new LevelsBlockModel();
		this.view = new LevelsBlockView(this.model.levels, this.model.getCompletedLevels());
		this.layoutExample = new LayoutExampleController(
			<HTMLElement>document.querySelector('.items-container'),
			this.model.currentLevel
		);
	}

	public init() {
		this.view.mount(this.model.levels, this.model.currentLevel);
		this.bindListeners();
		this.layoutExample.init();
	}

	private bindListeners() {
		this.view.buttons.menu.addEventListener('click', () => this.view.toggleLevelsMenu());
		this.view.buttons.prev.addEventListener('click', () => this.updateAppView(this.model.prevLevel(), this.model.levels));
		this.view.buttons.next.addEventListener('click', () => this.updateAppView(this.model.nextLevel(), this.model.levels));
		this.view.levelsBlock.addEventListener('click', (e) => this.levelsBlockHandler(e, this.model.levels));
	}

	private updateAppView(level: Level, levels: LevelsList): void {
		this.view.updateView(levels, level);
		this.layoutExample.view.updateView(level.markup);
	}

	private levelsBlockHandler(e: MouseEvent, levels: LevelsList): void {
		const clickedElement = (<HTMLElement>e.target).closest('.level');
		if (clickedElement) {
			const selectedLevel = this.model.changeLevel(Number(clickedElement.id));
			this.updateAppView(selectedLevel, levels);
			this.view.toggleLevelsMenu();
		}
	}
}