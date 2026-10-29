export function evaluateHand(hand: Card[]): number {
    const values = hand.map(card => card.value);

    const hasThreeOfAKind = values.some(value =>
        values.filter(v => v === value).length === 3
    );

    if (hasThreeOfAKind) {
        return 30;
    }

    return Math.max(...values);
}