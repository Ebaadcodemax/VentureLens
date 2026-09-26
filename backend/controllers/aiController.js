const { analyzeIdea } = require("../services/aiService");
const { validateEvaluation } = require("../services/validationService");
const { calculateScore } = require("../services/scoringService");

const testAI = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        // 1. Ask AI to evaluate the idea
        const evaluation = await analyzeIdea(
            title,
            description
        );

        // 2. Validate AI response
        validateEvaluation(evaluation);

        // 3. Calculate our controlled score
        const overallScore = calculateScore(evaluation);

        res.status(200).json({
            success: true,

            evaluation,

            overallScore
        });

    } catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    testAI
};