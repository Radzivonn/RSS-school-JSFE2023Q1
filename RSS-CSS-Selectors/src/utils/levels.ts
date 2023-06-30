import { LevelsList } from './levelTypes';

const levels: LevelsList = [
	{
		levelNumber: 1,
		markup: "<envelope class='animated-item'></envelope><envelope class='animated-item'></envelope>",
		html: "<div>  &lt;envelope/&gt;</div><div>  &lt;envelope/&gt;</div>",
		correctSelectors: ['envelope', '*'],
		task: "Select the envelopes",
		description: {
			levelTitle: "Type Selector",
			brief: "Select elements by their type",
			syntax: "A",
			taskDescription: "Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.",
			example: "<p class='syntax'> div </p> selects all <p class='syntax'> div </p> elements.",
		}
	},
	{
		levelNumber: 2,
		markup: "<envelope></envelope><parcel class='animated-item'></parcel><envelope></envelope>",
		html: "<div>  &lt;envelope/&gt;</div><div>  &lt;parcel/&gt;</div><div>  &lt;envelope/&gt;</div>",
		correctSelectors: ['parcel'],
		task: "Select the parcel",
		description: {
			levelTitle: "Type Selector",
			brief: "Select elements by their type",
			syntax: "B",
			taskDescription: "Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.",
			example: "<p class='syntax'> div </p>  selects all <p class='syntax'> div </p> elements.",
		}
	},
	{
		levelNumber: 3,
		markup: "<envelope></envelope><parcel></parcel><envelope><stamp class='animated-item'></stamp></envelope>",
		html: "<div>  &lt;envelope/&gt;</div><div>  &lt;parcel/&gt;</div><div>  &lt;envelope&gt;\n    &lt;stamp/&gt;\n  &lt;/envelope&gt;</div>",
		correctSelectors: ['envelope stamp', 'stamp', '* stamp'],
		task: "Select the stamp on an envelope",
		description: {
			levelTitle: "Descendant Selector",
			brief: "Select an element inside another element",
			syntax: "A B",
			taskDescription: "Selects all B inside of A. B is called a descendant because it is inside of another element.",
			example: "<p class='syntax'> p strong </p>  selects all <p class='syntax'> &lt;strong&gt; </p> elements  that are inside of any <p class='syntax'> &lt;p&gt; </p>",
		}
	},
	{
		levelNumber: 4,
		markup: "<parcel></parcel><parcel class='animated-item'><seal></seal></parcel><envelope></envelope>",
		html: "<div>  &lt;parcel/&gt;</div><div>  &lt;parcel id='seal'/&gt;</div><div>  &lt;envelope/&gt;</div>",
		correctSelectors: ['#seal', 'parcel#seal', '*#seal'],
		task: "Select the parcel with seal",
		description: {
			levelTitle: "ID Selector",
			brief: "Select elements with an ID",
			syntax: "#id",
			taskDescription: "Selects the element with a specific id. You can also combine the ID selector with the type selector.",
			example: "<p class='syntax'> #cool </p> selects any element with <p class='syntax'> id='cool' </p>",
		}
	},
	{
		levelNumber: 5,
		markup: "<envelope class='opened animated-item'></envelope><parcel></parcel><envelope></envelope><envelope class='opened animated-item'></envelope>",
		html: "<div>  &lt;envelope class='opened'/&gt;</div><div>  &lt;parcel/&gt;</div><div>  &lt;envelope/&gt;</div><div>  &lt;envelope class='opened'/&gt;</div>",
		correctSelectors: ['envelope.opened', '.opened', '*.opened'],
		task: "Select opened envelope",
		description: {
			levelTitle: "Select elements by their class",
			brief: "Select an element inside another element",
			syntax: ".classname",
			taskDescription: "The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
			example: "<p class='syntax'> .neato </p> selects all elements with <p class='syntax'> class='neato' </p>",
		}
	},
	{
		levelNumber: 6,
		markup: "<parcel></parcel><envelope class='animated-item'><seal></seal></envelope><parcel><seal></seal></parcel><envelope></envelope>",
		html: "<div>  &lt;parcel/&gt;</div><div>  &lt;envelope id='seal'/&gt;</div><div>  &lt;parcel id='seal'/&gt;</div><div>  &lt;envelope/&gt;</div>",
		correctSelectors: ['envelope#seal'],
		task: "Select envelope with id seal",
		description: {
			levelTitle: "Combine the ID Selector",
			brief: "",
			syntax: "A#ID",
			taskDescription: "You can combine the class selector with other selectors, like the type selector.",
			example: "<p class='syntax'> element#big </p> selects all elements with <p class='syntax'> id='big' </p>",
		}
	},
	{
		levelNumber: 7,
		markup: "<envelope class='opened'></envelope><envelope></envelope><envelope class='opened'><stamp class='animated-item'></stamp></envelope><parcel></parcel><envelope class='opened></envelope>",
		html: "<div>  &lt;envelope class='opened'/&gt;</div> <div>  &lt;envelope/&gt;</div><div>  &lt;envelope class='opened'&gt;\n    &lt;stamp/&gt;\n  &lt;/envelope&gt;</div><div>  &lt;parcel/&gt;</div>",
		correctSelectors: ['envelope.opened stamp', 'stamp'],
		task: "Select stamp inside opened envelope",
		description: {
			levelTitle: "Descendant Selector",
			brief: "Select an element inside another element with classname",
			syntax: "A.classname B",
			taskDescription: "Selects all B inside A with classname.",
			example: "<p class='syntax'> p.big strong </p>  selects all <p class='syntax'> &lt;strong&gt; </p> elements that are inside of any <p class='syntax'> &lt;p&gt; </p> with class <p class='syntax'> big </p>",
		}
	},
	{
		levelNumber: 8,
		markup: "<stamp class='animated-item'></stamp><envelope><stamp class='animated-item'></stamp></envelope><parcel><seal class='animated-item'></seal></parcel><envelope><seal class='animated-item'></seal></envelope>",
		html: "<div>  &lt;stamp/&gt;</div><div>  &lt;envelope&gt;\n    &lt;stamp/&gt;\n  &lt;/envelope&gt;</div><div>  &lt;parcel&gt;\n    &lt;seal/&gt;\n  &lt;/parcel&gt;</div><div>  &lt;envelope&gt;\n    &lt;seal/&gt;\n  &lt;/envelope&gt;</div>",
		correctSelectors: ['stamp, seal', 'seal, stamp'],
		task: "Select all the stamps and seals",
		description: {
			levelTitle: "Comma Combinator",
			brief: "Combine, selectors, with... commas!",
			syntax: "A, B",
			taskDescription: "Thanks to Shatner technology, this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.",
			example: "<p class='syntax'> a, p, div </p> selects all <p class='syntax'> a </p>, <p class='syntax'> p </p> and <p class='syntax'> div </p> elements",
		}
	},
	{
		levelNumber: 9,
		markup: "<stamp class='animated-item'></stamp><envelope class='animated-item'></envelope><parcel class='animated-item'></parcel><envelope class='opened animated-item'></envelope>",
		html: "<div>  &lt;stamp/&gt;</div><div>  &lt;envelope/&gt;</div><div>  &lt;parcel/&gt;</div><div>  &lt;envelope class='opened'/&gt;</div>",
		correctSelectors: ['*'],
		task: "Select all the things!",
		description: {
			levelTitle: "The Universal Selector",
			brief: "You can select everything!",
			syntax: "*",
			taskDescription: "You can select all elements with the universal selector!",
			example: "<p class='syntax'> p * </p> selects any element inside all <p class='syntax'> p </p> elements.",
		}
	},
	{
		levelNumber: 10,
		markup: "<envelope><stamp class='animated-item'></stamp></envelope><parcel></parcel><envelope><seal class='animated-item'></seal class='animated-item'></envelope><parcel><seal class='animated-item'></seal></parcel>",
		html: "<div>  &lt;envelope&gt;\n    &lt;stamp/&gt;\n  &lt;/envelope&gt;</div><div>  &lt;parcel/&gt;</div><div>  &lt;envelope&gt;\n    &lt;seal/&gt;\n  &lt;/envelope&gt;</div><div>  &lt;parcel&gt;\n    &lt;seal/&gt;\n  &lt;/parcel&gt;</div>",
		correctSelectors: ['envelope *'],
		task: "Select everything on an envelope!",
		description: {
			levelTitle: "Combine the Universal Selector",
			brief: "This selects all elements inside of A.",
			syntax: "A *",
			taskDescription: "This selects all elements inside of A.",
			example: "<p class='syntax'> p * </p> selects any element inside all <p class='syntax'> p </p> elements.",
		}
	},
];

export default levels;