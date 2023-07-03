import { IModel } from "./types";
import { Level } from "@/utils/levelTypes";
import LevelDataStore from "@/utils/store/levelsStore";

export default class LevelsBlockModel implements IModel {
	public store = new LevelDataStore();
 
	public getCurrentLevel() {
		return this.store.currentLevel;
	}

	public getLevels() {
		return this.store.levels;
	}

	public getCompletedLevels() {
		return this.store.completedLevels;
	}

	public prevLevel(): Level {
		if(this.store.currentLevelNumber > 0) this.store.currentLevel = this.store.levels[--this.store.currentLevelNumber];
		return this.store.currentLevel;
	}

	public nextLevel(): Level {
		if(this.store.currentLevelNumber < this.store.levels.length - 1) this.store.currentLevel = this.store.levels[++this.store.currentLevelNumber];
		return this.store.currentLevel;
	}

	public changeLevel(levelNumber: number): Level {
		if (levelNumber >= 0 && levelNumber < this.store.levels.length) {
			this.store.currentLevelNumber = levelNumber;
			this.store.currentLevel = this.store.levels[this.store.currentLevelNumber];
		}
		return this.store.currentLevel;
	}
}