# VentureLens

> AI-powered startup idea validation and analysis platform.

VentureLens helps founders evaluate startup ideas using structured AI analysis across six core dimensions: problem strength, market demand, feasibility, competition, differentiation, and monetization.

The application combines an LLM with deterministic backend validation and scoring, so the AI provides the analysis while the application controls the final evaluation logic.

---

## Features

- AI-powered startup idea evaluation
- Six-dimensional idea analysis
- Structured scoring from 1–10
- Weighted overall score
- Key strengths identification
- Key risks identification
- Target customer analysis
- Suggested improvement for the idea
- Backend validation of AI-generated responses
- MongoDB persistence
- Responsive modern frontend
- Loading and error states

---

## How It Works

```text
User submits startup idea
          ↓
       React
          ↓
   Express API
          ↓
      AI Service
          ↓
    Hugging Face LLM
          ↓
    Structured JSON
          ↓
 Validation Service
          ↓
    Scoring Service
          ↓
      MongoDB
          ↓
     API Response
          ↓
        React
