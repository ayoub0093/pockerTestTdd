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


test.each([
    [2, 30],
    [7, 30],
    [14, 30]
])("three cards of value %i should return %i points", (value, expected) => {
    const hand = [
        { value, suit: "heart" },
        { value, suit: "spade" },
        { value, suit: "diamond" },
        { value: 9, suit: "club" },
        { value: 10, suit: "heart" }
    ];

    expect(evaluateHand(hand)).toBe(expected);
});


test.each([
    [
        [5, 6, 7, 8, 9],
        40
    ],
    [
        [10, 11, 12, 13, 14],
        40
    ],
    [
        [9, 5, 7, 6, 8],
        40
    ]
])("straight %j should return %i points", (values, expected) => {
    const suits = ["heart", "spade", "diamond", "club", "heart"];

    const hand = values.map((value, index) => ({
        value,
        suit: suits[index]
    }));

    expect(evaluateHand(hand)).toBe(expected);
});

test("Ace cannot be used as 1 in a straight", () => {
    const hand = [
        { value: 14, suit: "heart" },
        { value: 2, suit: "spade" },
        { value: 3, suit: "diamond" },
        { value: 4, suit: "club" },
        { value: 5, suit: "heart" }
    ];

    expect(evaluateHand(hand)).toBe(14);
});
test("repeated values do not form a straight", () => {
    const hand = [
        { value: 5, suit: "heart" },
        { value: 5, suit: "spade" },
        { value: 6, suit: "diamond" },
        { value: 7, suit: "club" },
        { value: 8, suit: "heart" }
    ];

    expect(evaluateHand(hand)).toBe(8);
});