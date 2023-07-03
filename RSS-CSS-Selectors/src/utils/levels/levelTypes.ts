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
	task: string,
	description: LevelDescription,
}>

export type completedLevels = number[];

export type LevelsList = ReadonlyArray<Level>;
