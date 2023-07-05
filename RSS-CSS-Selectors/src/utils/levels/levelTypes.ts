type LevelDescription = {
	levelTitle: string,
	brief: string,
	syntax: string,
	taskDescription: string,
	example: string,
}

export type ConfigElement = {
	tag: string,
	className?: string,
	id?: string,
	child?: ConfigElement,
	isCorrectAnswer?: boolean
} 
	
export type Level = Readonly<{
	levelNumber: number,
	elements: ConfigElement[],
	correctSelector: string, // for help button
	task: string,
	description: LevelDescription,
}>

export type completedLevels = number[];

export type LevelsList = ReadonlyArray<Level>;

export type CompletedLevelsData = {
	levelNumber: number,
	isCompletedWithHelp: boolean
}[];