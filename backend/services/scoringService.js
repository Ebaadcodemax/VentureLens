const weights = {
    problemStrength: 0.20,
    marketDemand: 0.20,
    feasibility: 0.15,
    competition: 0.15,
    differentiation: 0.15,
    monetization: 0.15
};

const calculateScore = (evaluation) => {
    const score =
        evaluation.problemStrength.score * weights.problemStrength +
        evaluation.marketDemand.score * weights.marketDemand +
        evaluation.feasibility.score * weights.feasibility +
        evaluation.competition.score * weights.competition +
        evaluation.differentiation.score * weights.differentiation +
        evaluation.monetization.score * weights.monetization;

    return Number(score.toFixed(2));
};

module.exports = {
    calculateScore
};