import { trigger, style, animate, transition, query, group } from "@angular/animations";

const left = [
	query(":enter, :leave", style({ position: "absolute", width: "100%" }), { optional: true }),
	group([
		query(":enter", [style({ transform: "translateX(-100%)" }), animate(".2s ease-out", style({ transform: "translateX(0%)" }))], {
			optional: true,
		}),
		query(":leave", [style({ transform: "translateX(0%)" }), animate(".2s ease-out", style({ transform: "translateX(100%)" }))], {
			optional: true,
		}),
	]),
];

const right = [
	query(":enter, :leave", style({ position: "absolute", width: "100%" }), { optional: true }),
	group([
		query(":enter", [style({ transform: "translateX(100%)" }), animate(".2s ease-out", style({ transform: "translateX(0%)" }))], {
			optional: true,
		}),
		query(":leave", [style({ transform: "translateX(0%)" }), animate(".2s ease-out", style({ transform: "translateX(-100%)" }))], {
			optional: true,
		}),
	]),
];

export const swipeAnimation = trigger("swipe", [transition(":increment", right), transition(":decrement", left)]);

export const inOutAnimation = trigger("inOutAnimation", [
	transition(":enter", [style({ height: 0, opacity: 0 }), animate("1s ease-out", style({ height: 300, opacity: 1 }))]),
	transition(":leave", [style({ height: 300, opacity: 1 }), animate("1s ease-in", style({ height: 0, opacity: 0 }))]),
]);
