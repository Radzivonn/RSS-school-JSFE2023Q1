import LevelsBlockController from "@/components/LevelsBlock/LevelsBlockController";
import LayoutExampleController from '@/components/LayoutExample/LayoutExampleController';
import HTMLViewerController from "@/components/HTMLViewer/HTMLViewerController";
import CSSEditorController from "@/components/CSSEditor/CSSEditorController";

export default class App {
	private levelsBlock: LevelsBlockController;
	private layoutExample: LayoutExampleController;
	private htmlViewer: HTMLViewerController;
	private cssEditor: CSSEditorController;
	
	constructor() {
		this.levelsBlock = new LevelsBlockController();
		this.layoutExample = new LayoutExampleController();
		this.htmlViewer = new HTMLViewerController();
		this.cssEditor = new CSSEditorController();
	}

	public init(): void {
		this.layoutExample.init();
		this.htmlViewer.init();
		this.cssEditor.init();
		this.levelsBlock.init();
	}
}