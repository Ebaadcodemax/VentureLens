const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const analyzeIdea = async (title, description) => {

  const prompt = `
You are a startup idea evaluation engine.

Evaluate the following startup idea objectively.

TITLE:
${title}

DESCRIPTION:
${description}

Evaluate these six criteria:

1. problemStrength
2. marketDemand
3. feasibility
4. competition
5. differentiation
6. monetization

For each criterion:
- Give an integer score from 1 to 10.
- Give a concise reason based specifically on the provided idea.
- Do not invent facts about the market or competitors.
- If information is missing, state that uncertainty in the reason.

Also provide:

1. keyStrengths
   - 2 to 3 important strengths of the idea.

2. keyRisks
   - 2 to 3 important risks or weaknesses.

3. targetCustomer
   - A concise description of the most likely target customer.

4. suggestedImprovement
   - One concrete improvement that could make the idea stronger.

IMPORTANT:
Return ONLY valid JSON.
Do not use markdown.
Do not include \`\`\`json.
Do not include any text outside the JSON.

Use exactly this structure:

{
  "problemStrength": {
    "score": 1,
    "reason": "..."
  },
  "marketDemand": {
    "score": 1,
    "reason": "..."
  },
  "feasibility": {
    "score": 1,
    "reason": "..."
  },
  "competition": {
    "score": 1,
    "reason": "..."
  },
  "differentiation": {
    "score": 1,
    "reason": "..."
  },
  "monetization": {
    "score": 1,
    "reason": "..."
  },
  "keyStrengths": [
    "...",
    "..."
  ],
  "keyRisks": [
    "...",
    "..."
  ],
  "targetCustomer": "...",
  "suggestedImprovement": "..."
}
`;;

  const response = await client.chatCompletion({
    model: "Qwen/Qwen3-32B",

    messages: [
      {
        role: "user",
        content: prompt
      }
    ],

    max_tokens: 1500,
    temperature: 0.2
  });

  const rawResponse = response.choices[0].message.content;
  console.log("RAW AI RESPONSE:");
  console.log(rawResponse);



  try {
    return JSON.parse(rawResponse);
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = {
  analyzeIdea
};