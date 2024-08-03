export default function formatScore(score: number) {
    return score == 10 ? 10 : score.toFixed(1)
}