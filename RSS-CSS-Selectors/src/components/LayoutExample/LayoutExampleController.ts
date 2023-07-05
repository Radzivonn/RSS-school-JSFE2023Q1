import { IController } from './types';
import { LayoutExampleView } from './LayoutExampleView';
import { animateElem, animateElements, hoverHandler } from '@/utils/helperFuncs';
import { CustomEvents } from "@/utils/customEvents";

export default class LayoutExampleController implements IController {
	public view: LayoutExampleView;
	private editorElement = document.querySelector('.editor-wrapper') as HTMLElement;

	constructor() {
		this.view = new LayoutExampleView(document.querySelector('.items-container') as HTMLElement);
	}

	public init() {
		this.bindListeners();
	}

	private bindListeners() {
		this.view.root.addEventListener('mouseover', (e) => hoverHandler(e, 'exampleObject'));
		this.view.root.addEventListener('mouseout', (e) => hoverHandler(e, 'exampleObject'));
		document.addEventListener (
			CustomEvents.CHANGELEVEL,
			(e) => this.view.updateView((<CustomEvent>e).detail.currentLevel.elements)
		);
		document.addEventListener(
			CustomEvents.ENTERSELECTOR,
			(e) => this.enterSelectorHandler(e, (<CustomEvent>e).detail.isCompletedWithHelp)
		);
	}

	private enterSelectorHandler(e: Event, helpFlag: boolean): void {
		const selector = (<CustomEvent>e).detail.selector;
		const selectedElements = Array.from(this.view.root.querySelectorAll(selector));
		if (selectedElements.length > 0) {
			const isCorrect: boolean = selectedElements.every(element => Array.from(element.classList).includes('animated-item'));
			if (!isCorrect) animateElements(selectedElements, 'shake');
			else {
				this.animateWin(selectedElements, helpFlag);
			}
		}	else animateElem(this.editorElement, 'shake');
	}

	private animateWin(elements: Element[], helpFlag: boolean, animationDuration = 1000) {
		elements.forEach(element => element.classList.remove('animated-item'));
		setTimeout(() => {
			animateElements(elements, 'swap', animationDuration);
			setTimeout(() => document.dispatchEvent(new CustomEvent(CustomEvents.LEVELCOMPLETED, {
				detail: {
					isCompletedWithHelp: helpFlag
				}
			})), 500);
		}, 10);
	}
}