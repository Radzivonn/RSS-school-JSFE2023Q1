import { IController } from "./types";
import LevelsBlockModel from "./LevelsBlockModel";
import LevelsBlockView from "./LevelsBlockView";
import LayoutExampleController from '@/components/LayoutExample/LayoutExampleController';
import HTMLViewerController from "@/components/HTMLViewer/HTMLViewerController";
import { Level, LevelsList } from "@/utils/levelTypes";

export default class LevelsBlockController implements IController {
	public model: LevelsBlockModel;
	public view: LevelsBlockView;
	private layoutExample: LayoutExampleController;
	private htmlViewer: HTMLViewerController;
	constructor() {
		this.model = new LevelsBlockModel();
		this.view = new LevelsBlockView(this.model.levels, this.model.completedLevels);
		this.layoutExample = new LayoutExampleController();
		this.htmlViewer = new HTMLViewerController();
	}

	public init(): void {
		this.view.mount(this.model.levels, this.model.currentLevel);
		this.layoutExample.init();
		this.htmlViewer.init();
		this.bindListeners();
		this.bindChildListeners();
	}

	private bindListeners(): void {
		this.view.buttons.menu.addEventListener('click', () => this.view.toggleLevelsMenu());
		this.view.buttons.prev.addEventListener('click', () => this.updateAppView(this.model.prevLevel(), this.model.levels));
		this.view.buttons.next.addEventListener('click', () => this.updateAppView(this.model.nextLevel(), this.model.levels));
		this.view.levelsBlock.addEventListener('click', (e) => this.levelsBlockHandler(e, this.model.levels));
	}

	private bindChildListeners(): void {
		this.layoutExample.view.root.addEventListener('mouseover', (e) => this.hoverHandler(e, 'exampleObject'));
		this.layoutExample.view.root.addEventListener('mouseout', (e) => this.hoverHandler(e, 'exampleObject'));
		this.htmlViewer.view.root.addEventListener('mouseover', (e) => this.hoverHandler(e, 'html__markup-code'));
		this.htmlViewer.view.root.addEventListener('mouseout', (e) => this.hoverHandler(e, 'html__markup-code'));
	}

	private updateAppView(level: Level, levels: LevelsList): void {
		this.view.updateView(levels, level);
		this.layoutExample.view.updateView(level.elements);
		this.htmlViewer.view.updateView(level.elements);
	}

	private levelsBlockHandler(e: MouseEvent, levels: LevelsList): void {
		const clickedElement = (<HTMLElement>e.target).closest('.level');
		if (clickedElement) {
			const selectedLevel = this.model.changeLevel(Number(clickedElement.id));
			this.updateAppView(selectedLevel, levels);
			this.view.toggleLevelsMenu();
		}
	}

	private getEventElement(e: Event, childClassName: string): HTMLElement | null {
		return (<HTMLElement>e.target).closest(`.${childClassName}`);
	}

	private hoverHandler(e: Event, childClassName: string): void {
		const hoveredElement = this.getEventElement(e, childClassName);
		if (hoveredElement) {
			document.querySelectorAll(`[number="${hoveredElement.getAttribute('number')}"]`).forEach(element => {
				element.classList.toggle('hovered');
			});
		}
	}
}