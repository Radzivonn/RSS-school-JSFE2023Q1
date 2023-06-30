import { IModel } from "./types";
import { Level } from "@/utils/levelTypes";
import levels from '@/utils/levels';
import LevelDataStore from "@/utils/store/levelsStore";

export default class LevelsBlockModel implements IModel {
	public store = new LevelDataStore();
	public currentLevelNumber = this.store.getCurrentLevelNumber();
	public currentLevel = levels[this.currentLevelNumber];
	public levels = levels;
	public completedLevels = this.store.getCompletedLevels();

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