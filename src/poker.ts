
export type Card = {
    value: number;
    suit: string;
};

function getCardValues(hand: Card[]): number[] {
    return hand.map(card => card.value);
}

function hasMatchingCards(values: number[], count: number): boolean {
    return values.some(value =>
        values.filter(cardValue => cardValue === value).length === count
    );
}

function hasThreeOfAKind(values: number[]): boolean {
    return hasMatchingCards(values, 3);
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

function isFullHouse(values: number[]): boolean {
    const uniqueValues = [...new Set(values)];

    if (uniqueValues.length !== 2) {
        return false;
    }

    const firstValueCount = values.filter(
        value => value === uniqueValues[0]
    ).length;

    return firstValueCount === 2 || firstValueCount === 3;
}

function hasFourOfAKind(values: number[]): boolean {
    return hasMatchingCards(values, 4);
}


function isStraightFlush(hand: Card[], values: number[]): boolean {
    return isFlush(hand) && isStraight(values);
}


export function evaluateHand(hand: Card[]): number {
    const values = getCardValues(hand);

    if (isStraightFlush(hand, values)) {
        return 80;
    }

    if (hasFourOfAKind(values)) {
        return 60;
    }

    if (isFullHouse(values)) {
        return 50;
    }

    if (isFlush(hand)) {
        return 45;
    }

    if (isStraight(values)) {
        return 40;
    }

    if (hasThreeOfAKind(values)) {
        return 30;
    }

    return getHighestCardValue(values);
}

export function evaluateHands(hands: Card[][]): number {
    return hands.reduce(
        (totalScore, hand) => totalScore + evaluateHand(hand),
        0
    );
}
