const mongoose = require("mongoose");

const criterionSchema = new mongoose.Schema(
    {
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },

        reason: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

const ideaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        evaluation: {
            problemStrength: criterionSchema,
            marketDemand: criterionSchema,
            feasibility: criterionSchema,
            competition: criterionSchema,
            differentiation: criterionSchema,
            monetization: criterionSchema
        },

        overallScore: {
            type: Number,
            min: 1,
            max: 10
        },
        keyStrengths: {
            type: [String]
        },

        keyRisks: {
            type: [String]
        },

        targetCustomer: {
            type: String,
            trim: true
        },

        suggestedImprovement: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;