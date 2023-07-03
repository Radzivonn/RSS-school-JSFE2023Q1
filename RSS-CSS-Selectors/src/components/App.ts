import LevelsBlockController from "@/components/LevelsBlock/LevelsBlockController";
import LayoutExampleController from '@/components/LayoutExample/LayoutExampleController';
import HTMLViewerController from "@/components/HTMLViewer/HTMLViewerController";

export default class App {
	private levelsBlock: LevelsBlockController;
	private layoutExample: LayoutExampleController;
	private htmlViewer: HTMLViewerController;
	
	constructor() {
		this.levelsBlock = new LevelsBlockController();
		this.layoutExample = new LayoutExampleController();
		this.htmlViewer = new HTMLViewerController();
	}

	public init(): void {
		this.layoutExample.init();
		this.htmlViewer.init();
		this.levelsBlock.init();
	}
}