import { test, expect } from "vitest";
import { evaluateHand } from "./poker";

test.each([
    [7, 7]
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