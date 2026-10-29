import { test, expect } from "vitest";
import { evaluateHand } from "./poker";

test.each([
    [7, 7],
    [10, 10],
    [13, 13],
    [14, 14]
])("highest card %i returns %i points", (highest, expected) => {
    const hand = [
        { value: 2, suit: "heart" },
        { value: 3, suit: "spade" },
        { value: 4, suit: "diamond" },
        { value: 5, suit: "club" },
        { value: highest, suit: "heart" }
    ];

    expect(evaluateHand(hand)).toBe(expected);
});
test("highest card can be the first card", () => {
    const hand = [
        { value: 14, suit: "heart" },
        { value: 3, suit: "spade" },
        { value: 4, suit: "diamond" },
        { value: 5, suit: "club" },
        { value: 7, suit: "heart" }
    ];

    expect(evaluateHand(hand)).toBe(14);
});