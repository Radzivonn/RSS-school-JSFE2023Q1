import { IModel } from "./types";
import { Level, LevelsList } from "@/utils/levelTypes";
import levels from '@/utils/levels';

export default class LevelsBlockModel implements IModel {
	public currentLevelNumber: number = this.getCurrentLevelNumber();
	public currentLevel: Level = levels[this.currentLevelNumber];
	public levels: LevelsList = levels;
	
	private getCurrentLevelNumber(): number {
		const savedLevel = localStorage.getItem("currentLevel");
		return savedLevel ? JSON.parse(savedLevel) - 1 : 0;
	}

	public getCompletedLevels(): Array<number> {
		const savedData = localStorage.getItem("completedLevels");
		return savedData ? JSON.parse(savedData) : [];
	}

	public prevLevel(): Level {
		if(this.currentLevelNumber > 0) this.currentLevel = this.levels[--this.currentLevelNumber];
		return this.currentLevel;
	}

	public nextLevel(): Level {
		if(this.currentLevelNumber < this.levels.length - 1) this.currentLevel = this.levels[++this.currentLevelNumber];
		return this.currentLevel;
	}

	public changeLevel(levelNumber: number): Level {
		if (levelNumber >= 0 && levelNumber < this.levels.length) {
			this.currentLevelNumber = levelNumber;
			this.currentLevel = this.levels[this.currentLevelNumber];
		}
		return this.currentLevel;
	}
}