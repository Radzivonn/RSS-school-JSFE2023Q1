import { IController } from "./types";
import CSSEditorView from "./CSSEditorView";
import { CustomEvents } from "@/utils/customEvents";

export default class CSSEditorController implements IController {
	public view: CSSEditorView;

	constructor() {
		this.view = new CSSEditorView(
			<HTMLElement>document.querySelector('code.css')
		);
	}

	public init(): void {
		this.view.mount();
		this.bindListeners();
	}

	private bindListeners() {
		this.view.enterButton.addEventListener('mousedown', () => this.buttonHandler(this.view.enterButton));
		this.view.CSSInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.buttonHandler(this.view.enterButton)
			}
		});
		document.addEventListener(
			CustomEvents.CHANGELEVEL,
			() => {
				this.view.updateView();
			}
		);
	}

	private buttonHandler(button: HTMLElement): void {
		this.animateButton(button);
		document.dispatchEvent(
			new CustomEvent(CustomEvents.ENTERSELECTOR, {
				detail: {
					selector: this.getInputData()
				}
			})
		);
	}

	private getInputData(): string {
		return (<HTMLTextAreaElement>this.view.CSSTextarea).value;
	}

	private animateButton(element: HTMLElement, animationDuration = 200): void {
		element.classList.add('pressed');
		setTimeout(() => element.classList.remove('pressed'), animationDuration);
	}
}