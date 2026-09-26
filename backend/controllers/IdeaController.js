const Idea = require("../models/Idea");

const { analyzeIdea } = require("../services/aiService");
const { validateEvaluation } = require("../services/validationService");
const { calculateScore } = require("../services/scoringService");

const createIdea = async (req, res) => {
    try {
        const { title, description } = req.body;

        //check if title and description exist
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

        // 3. Calculate controlled score
        const overallScore = calculateScore(evaluation);

        // 4. Save everything to MongoDB
        const idea = await Idea.create({
            title,
            description,
            evaluation,
            overallScore,
            keyStrengths: evaluation.keyStrengths,
            keyRisks: evaluation.keyRisks,
            targetCustomer: evaluation.targetCustomer,
            suggestedImprovement: evaluation.suggestedImprovement
        });

        // 5. Return result
        res.status(201).json({
            success: true,
            idea
        });

    } catch (error) {

        console.error("Idea validation error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createIdea
};