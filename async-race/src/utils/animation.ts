import { DrawFunction } from './helperFuncs';

interface IConstructor {
	element: HTMLElement,
  duration: number;
	draw: DrawFunction;
}

export class CustomAnimation {
	animatedElement: HTMLElement;
	animationID: number | null = null;
	startTime = 0;
	duration: number;
	draw: DrawFunction;

	constructor({ element, duration, draw }: IConstructor) {
		this.animatedElement = element;
		this.duration = duration;
		this.draw = draw;
	}

	public initAnimation = () => {
		this.startTime = performance.now();

		if (!this.animationID) {
			this.animationID = requestAnimationFrame(this.animate);
		}
	};

	private animate = (time: number) => {
		const progress = (time - this.startTime) / this.duration;
		if (progress < 1 && this.animatedElement) {
			this.draw(this.animatedElement, progress);
			this.animationID = requestAnimationFrame(this.animate);
		} else {
			this.cancelAnimation();
		}
	};

	public cancelAnimation = () => {
		if (this.animationID) cancelAnimationFrame(this.animationID);
		this.animationID = null;
	};
}