import { readFile, writeFile, mkdir } from "fs/promises";
import OpenAI from "openai"; // GitHub Models uses OpenAI SDK

const token = process.env.OPENAI_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";


const client = new OpenAI({ baseURL: endpoint, apiKey: token });

const rollingFile = "data/rolling/enriched_7days.json";
const outputFolder = "data/rolling";
const outputFile = "data/rolling/weekly_ai.json";

await mkdir(outputFolder, { recursive: true });

const rollingData = JSON.parse(await readFile(rollingFile, "utf-8"));

const prompt = `
You are a cyber intelligence analyst.
You are given 7 days (or less) of enriched cyber event data in JSON.

Your job:
1. Produce a **weeklyBrief**: a concise, insightful, executive-level summary (1–2 paragraphs)
2. Identify **trends** for the upcoming days: patterns, spikes, declines, important signals
3. Provide **predictions** for the next upcoming days: likely risks, threat shifts, categories to watch, confidence level

Possibly consider the overall news (outside scope of this JSON) in these areas to enrich your analysis and inisghts. Make the text readable, maybe highlight important stuff.

JSON input:
${JSON.stringify(rollingData, null, 2)}

Return ONLY a JSON object in this exact structure:

{
  "startDate": "...",
  "endDate": "...",
  "weeklyBrief": "...",
  "trends": "...",
  "predictions": "..."
}
  `;

const response = await client.chat.completions.create({
  model: model,  // Or the model name you have access to
  messages: [
    {
      role: "system",
      content: "You are a cyber risk analyst. Format your output exactly as valid JSON as instructed."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.7,
  top_p: 1.0
});

// The model output text
const outputText = response.choices[0].message.content;

const json = JSON.parse(outputText);

await writeFile(outputFile, JSON.stringify(json, null, 2));


console.log("Weekly AI summary complete!");
