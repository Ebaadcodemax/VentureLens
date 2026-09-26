const criteria = [
    "problemStrength",
    "marketDemand",
    "feasibility",
    "competition",
    "differentiation",
    "monetization"
];

const validateEvaluation = (evaluation) => {

    for (const criterion of criteria) {

        if (!evaluation[criterion]) {
            throw new Error(`Missing criterion: ${criterion}`);
        }

        const score = evaluation[criterion].score;

        if (
            typeof score !== "number" ||
            score < 1 ||
            score > 10
        ) {
            throw new Error(
                `Invalid score for ${criterion}: ${score}`
            );
        }

        if (!evaluation[criterion].reason) {
            throw new Error(
                `Missing reason for ${criterion}`
            );
        }
        if (!Array.isArray(evaluation.keyStrengths)) {
            throw new Error("Invalid keyStrengths");
        }

        if (!Array.isArray(evaluation.keyRisks)) {
            throw new Error("Invalid keyRisks");
        }

        if (!evaluation.targetCustomer) {
            throw new Error("Missing targetCustomer");
        }

        if (!evaluation.suggestedImprovement) {
            throw new Error("Missing suggestedImprovement");
        }
    }

    return true;
};

module.exports = {
    validateEvaluation
};