type LevelDescription = {
	levelTitle: string,
	brief: string,
	syntax: string,
	taskDescription: string,
	example: string,
}

export type Level = Readonly<{
	levelNumber: number,
	markup: string,
	html: string,
	correctSelectors: Array<string>,
	task: string,
	description: LevelDescription,
}>

export type completedLevels = Array<number>;

export type LevelsList = ReadonlyArray<Level>;
