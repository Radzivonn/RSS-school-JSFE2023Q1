import { IController } from "./types";
import CSSEditorView from "./CSSEditorView";
import { CustomEvents } from "@/utils/customEvents";

export default class CSSEditorController implements IController {
	public view: CSSEditorView;
	private helpFlag = false;

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
		this.view.helpButton.addEventListener('mousedown', () => this.buttonHandler(this.view.helpButton))
		this.view.CSSInput.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.buttonHandler(this.view.enterButton)
			}
		});
		document.addEventListener(
			CustomEvents.CHANGELEVEL,
			(e) => {
				this.view.updateView();
				this.view.setCorrectSelector((<CustomEvent>e).detail.currentLevel.correctSelector);
				this.helpFlag = false;
			}
		);
	}

	private buttonHandler(button: HTMLElement): void {
		this.animateButton(button);
		const inputData = this.view.getInputData();
		if (button.classList.contains('enter-button')) {
			if (inputData.length > 0) {
				document.dispatchEvent(
					new CustomEvent(CustomEvents.ENTERSELECTOR, {
						detail: {
							selector: inputData,
							isCompletedWithHelp: this.helpFlag
						}
					})
				);
			}
		} else if(!this.helpFlag || inputData.length === 0){
			this.view.writeCorrectAnswer();
			this.helpFlag = true;
		}
	}

	private animateButton(element: HTMLElement, animationDuration = 200): void {
		element.classList.add('pressed');
		setTimeout(() => element.classList.remove('pressed'), animationDuration);
	}
}