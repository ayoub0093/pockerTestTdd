export function evaluateHand(hand: Card[]): number {
    return Math.max(...hand.map(card => card.value));
}