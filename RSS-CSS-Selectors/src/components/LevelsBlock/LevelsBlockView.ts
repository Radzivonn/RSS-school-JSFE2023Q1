import { IView, ButtonsSet } from "./types";
import { Level, LevelsList } from "@/utils/levels/levelTypes";
import { createElement, removeClasses } from "@/utils/helperFuncs";

export default class LevelsBlockView implements IView {
	private levelRequirementHeader = document.querySelector('.level-requirement') as HTMLElement;
	private numberNode = document.getElementById('current-level') as HTMLElement;
	private levelsAmountNode = document.getElementById('levels-amount') as HTMLElement;
	private levelInfoWrapper = document.querySelector('.level-info-wrapper') as HTMLElement;
	private levelSwitcherBlock = this.levelInfoWrapper.querySelector('.level-switcher') as HTMLElement;
	private progressLine: HTMLElement;
	private titleNode: HTMLElement;
	private briefNode: HTMLElement;
	private syntaxNode: HTMLElement;
	private taskDescriptionNode: HTMLElement;
	private examplesNode: HTMLElement;
	private example: HTMLElement;
	private levelMenu: HTMLElement;
	public levelsBlock: HTMLElement;
	private prevButton = document.getElementById('prev-button') as HTMLElement;
	private nextButton = document.getElementById('next-button') as HTMLElement;
	private menuButton = document.getElementById('menu-button') as HTMLElement;
	public buttons: ButtonsSet = {
		prev: this.prevButton,
		next: this.nextButton,
		menu: this.menuButton
	}

	constructor(levels: LevelsList, completedLevels: Array<number>) {
		this.progressLine = createElement({ tag: 'div', classNames: ['level-progress'] });
		this.progressLine.append(createElement({ tag: 'div', classNames: ['progress-line'] }));

		this.titleNode = createElement({ tag: 'h3', classNames: ['level-title'] });
		this.briefNode = createElement({ tag: 'h4', classNames: ['brief'] });
		this.syntaxNode = createElement({ tag: 'div', classNames: ['syntax'] });
		this.taskDescriptionNode = createElement({ tag: 'p', classNames: ['task-description'] });
		this.examplesNode = createElement({ tag: 'div', classNames: ['examples'] });
		this.example = createElement({ tag: 'p', classNames: ['example'] });
		this.examplesNode.append(
			createElement({ tag: 'h3', text: 'Examples' }),
			this.example
		);
		this.levelsBlock = createElement({ tag: 'div', classNames: ['levels']});
		this.levelMenu = this.createLevelMenu(levels, this.levelsBlock, completedLevels);
	}

	public updateView(levels: LevelsList, currentLevel: Level): void {
		const levelsAmount = levels.length;
		this.levelRequirementHeader.textContent = currentLevel.task;
		this.numberNode.textContent = String(currentLevel.levelNumber);
		this.levelsAmountNode.textContent = String(levelsAmount);
		this.progressLine.style.width = `${(currentLevel.levelNumber / levelsAmount) * 100}%`;
		this.titleNode.textContent = currentLevel.description.levelTitle;
		this.briefNode.textContent = currentLevel.description.brief;
		this.syntaxNode.textContent = currentLevel.description.syntax;
		this.taskDescriptionNode.textContent = currentLevel.description.taskDescription;
		this.example.textContent = '';
		this.example.insertAdjacentHTML('afterbegin', currentLevel.description.example);
		removeClasses(this.levelsBlock.children, 'active');
		(<HTMLElement>document.getElementById(`${currentLevel.levelNumber - 1}`)).classList.add('active');
	}

	private createLevelsList(levels: LevelsList,  completedLevels: Array<number>): Array<Node> {
		return levels.map((levelData, index) => {
			const classes: Array<string> = ['level'];
			if (completedLevels.includes(index)) classes.push('completed');
			const levelElement = createElement(
				{ tag: 'div', classNames: classes, id: `${index}` }
			);
			levelElement.append(
				createElement({ tag: 'span', classNames: ['checkmark']}),
				createElement({ tag: 'output', classNames: ['level-number'], text: `${levelData.levelNumber}`}),
				createElement({ tag: 'output', classNames: ['level-name'], text: levelData.description.syntax})
			);
			return levelElement;
		});
	}

	private createLevelInfoBlock(): HTMLElement {
		const componentView = createElement({ tag: 'section', classNames: ['level-info'] });
		componentView.append(
			this.levelMenu,
			this.titleNode,
			this.briefNode,
			this.syntaxNode,
			this.taskDescriptionNode,
			this.examplesNode
		);
		return componentView;
	}

	private createLevelMenu(levels: LevelsList, levelsListBlock: HTMLElement, completedLevels: Array<number>) {
		const componentView = createElement({ tag: 'div', classNames: ['level-info-wrapper', 'level-menu-wrapper'] });
		const header = createElement({ tag: 'section', classNames: ['level-menu__header'] });
		header.append(createElement({ tag: 'h2', text: 'Choose a level' }));
		levelsListBlock.append(...this.createLevelsList(levels, completedLevels));
		componentView.append(
			header,
			levelsListBlock,
			createElement({ tag: 'button', classNames: ['reset-progress-button'], text: 'Reset progress' })
		);
		return componentView;
	}

	// TODO
	public createView(): void {
		this.levelSwitcherBlock.append(this.progressLine);
		this.levelSwitcherBlock.after(this.createLevelInfoBlock());
		this.levelInfoWrapper.after(this.levelMenu);
	}

	public toggleLevelsMenu(): void {
		this.levelMenu.classList.toggle('active');
		this.menuButton.classList.toggle('active');
	}
}
