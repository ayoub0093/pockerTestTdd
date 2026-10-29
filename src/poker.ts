export type Card = {
    value: number;
    suit: string;
};

function getCardValues(hand: Card[]): number[] {
    return hand.map(card => card.value);
}

function hasThreeOfAKind(values: number[]): boolean {
    return values.some(value =>
        values.filter(cardValue => cardValue === value).length === 3
    );
}

function isStraight(values: number[]): boolean {
    const sortedValues = [...values].sort((a, b) => a - b);

    return sortedValues.every((value, index) =>
        index === 0 || value === sortedValues[index - 1] + 1
    );
}

function isFlush(hand: Card[]): boolean {
    return hand.every(card => card.suit === hand[0].suit);
}

function getHighestCardValue(values: number[]): number {
    return Math.max(...values);
}

export function evaluateHand(hand: Card[]): number {
    const values = getCardValues(hand);

    if (hasThreeOfAKind(values)) {
        return 30;
    }

    if (isFlush(hand)) {
        return 45;
    }

    if (isStraight(values)) {
        return 40;
    }

    return getHighestCardValue(values);
}