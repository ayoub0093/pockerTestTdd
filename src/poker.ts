export function evaluateHand(hand: Card[]): number {
    const values = hand.map(card => card.value);

    const hasThreeOfAKind = values.some(value =>
        values.filter(v => v === value).length === 3
    );

    if (hasThreeOfAKind) {
        return 30;
    }

    const sortedValues = [...values].sort((a, b) => a - b);

    const isStraight = sortedValues.every((value, index) =>
        index === 0 || value === sortedValues[index - 1] + 1
    );

    const isFlush = hand.every(card =>
        card.suit === hand[0].suit
    );

    if (isFlush) {
        return 45;
    }

    if (isStraight) {
        return 40;
    }

    return Math.max(...values);
}