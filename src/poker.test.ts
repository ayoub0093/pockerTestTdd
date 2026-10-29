import { test, expect } from "vitest";

import { evaluateHand, evaluateHands } from "./poker";


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

test.each([
    ["heart", 45],
    ["spade", 45],
    ["diamond", 45],
    ["club", 45]
])("five cards of suit %s should return %i points", (suit, expected) => {
    const hand = [
        { value: 2, suit },
        { value: 5, suit },
        { value: 7, suit },
        { value: 9, suit },
        { value: 13, suit }
    ];

    expect(evaluateHand(hand)).toBe(expected);
});

test.each([
    [2, 9, 50],
    [7, 11, 50],
    [14, 5, 50]
])("full with three %i and two %i returns %i points",
    (threeValue, pairValue, expected) => {
        const hand = [
            { value: threeValue, suit: "heart" },
            { value: threeValue, suit: "spade" },
            { value: threeValue, suit: "diamond" },
            { value: pairValue, suit: "club" },
            { value: pairValue, suit: "heart" }
        ];

        expect(evaluateHand(hand)).toBe(expected);
    }
);

test.each([
    [2, 9, 60],
    [7, 13, 60],
    [14, 5, 60]
])(
    "four cards of value %i with a %i return %i points",
    (fourOfAKindValue, otherValue, expected) => {
        const hand = [
            { value: fourOfAKindValue, suit: "heart" },
            { value: fourOfAKindValue, suit: "spade" },
            { value: fourOfAKindValue, suit: "diamond" },
            { value: fourOfAKindValue, suit: "club" },
            { value: otherValue, suit: "heart" }
        ];

        expect(evaluateHand(hand)).toBe(expected);
    }
);

test.each([
    [5, "heart", 80],
    [9, "spade", 80],
    [10, "diamond", 80]
])(
    "straight flush starting at %i with suit %s returns %i",
    (startValue, suit, expected) => {
        const hand = Array.from({ length: 5 }, (_, index) => ({
            value: startValue + index,
            suit
        }));

        expect(evaluateHand(hand)).toBe(expected);
    }
);


test("returns the total score of multiple hands", () => {
    const hands = [
        // Full House: 50
        [
            { value: 2, suit: "heart" },
            { value: 2, suit: "spade" },
            { value: 2, suit: "diamond" },
            { value: 9, suit: "club" },
            { value: 9, suit: "heart" }
        ],

        // Straight: 40
        [
            { value: 5, suit: "heart" },
            { value: 6, suit: "spade" },
            { value: 7, suit: "diamond" },
            { value: 8, suit: "club" },
            { value: 9, suit: "heart" }
        ],

        // Flush: 45
        [
            { value: 2, suit: "spade" },
            { value: 5, suit: "spade" },
            { value: 7, suit: "spade" },
            { value: 9, suit: "spade" },
            { value: 13, suit: "spade" }
        ],

        // High Card: 13
        [
            { value: 2, suit: "heart" },
            { value: 4, suit: "spade" },
            { value: 7, suit: "diamond" },
            { value: 10, suit: "club" },
            { value: 13, suit: "heart" }
        ]
    ];

    expect(evaluateHands(hands)).toBe(148);
});
test("returns zero when there are no hands", () => {
    expect(evaluateHands([])).toBe(0);
});

test("returns the score of a single hand", () => {
    const hand = [
        { value: 2, suit: "heart" },
        { value: 4, suit: "spade" },
        { value: 7, suit: "diamond" },
        { value: 10, suit: "club" },
        { value: 14, suit: "heart" }
    ];

    expect(evaluateHands([hand])).toBe(14);
});
