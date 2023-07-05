import Store from "./store";
import levels from "../levels/levels";
import { CompletedLevelsData } from "../levels/levelTypes";

enum DATAKEYS {
	CURRENTLEVELKEY = "currentLevel",
	COMPLETEDLEVELSKEY = "completedLevels"
}

export default class LevelDataStore extends Store {
	DATAKEYS = DATAKEYS;
	public currentLevelNumber = this.getCurrentLevelNumber();
	public currentLevel = levels[this.currentLevelNumber];
	public levels = levels;
	public completedLevels = this.getCompletedLevels();

	public resetProgress(): void {
		this.currentLevelNumber = 0;
		this.currentLevel = this.levels[this.currentLevelNumber];
		this.completedLevels = [];
	}

	private getCurrentLevelNumber() {
		const data = this.getData<number>(this.DATAKEYS.CURRENTLEVELKEY);
		return data ? data : 0;
	}

	private getCompletedLevels() {
		const data = this.getData<CompletedLevelsData>(this.DATAKEYS.COMPLETEDLEVELSKEY);
		return data ? data : [];
	}

	public saveOptions(): void {
		this.saveData(this.DATAKEYS.CURRENTLEVELKEY, this.currentLevelNumber);
		this.saveData(this.DATAKEYS.COMPLETEDLEVELSKEY, this.completedLevels);
	}
}