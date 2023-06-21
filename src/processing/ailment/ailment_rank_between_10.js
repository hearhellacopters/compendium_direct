export default function ailment_rank_between_10(num) {
    return Math.min(Math.max(num, 1), 10);
}