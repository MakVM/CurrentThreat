import { readFile, writeFile, mkdir } from "fs/promises";
import OpenAI from "openai"; // GitHub Models uses OpenAI SDK

const token = process.env.OPENAI_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";


const client = new OpenAI({ baseURL: endpoint, apiKey: token });

// Get today’s date
const today = new Date("2025-11-12").toISOString().slice(0, 10);
const rawFile = `data/daily/${today}.json`;
const enrichedFolder = "data/today";

const rawData = JSON.parse(await readFile(rawFile, "utf-8"));

const prompt = `
You are a cyber risk analyst. 
You receive a list of daily cyber events in JSON format like this:

${JSON.stringify(rawData, null, 2)}

For each event, assign:
- severity: Low, Medium, or High
- tags: list of categories (scam, hack, fraud, breach, leak)

Also provide:
- overallDayThreatScore: number 0-100
- dailyBrief: short summary (1 paragraph) describing the events, trends, and top alerts

Return the full output as a single JSON object like this:

{
  "events": [
    { "timestamp": "...", "entities": "...", "eventSummary": "...", "severity": "...", "tags": ["..."] },
    ...
  ],
  "overallDayThreatScore": 0-100,
  "dailyBrief": "..."
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

const enrichedData = JSON.parse(outputText);

await mkdir(enrichedFolder, { recursive: true });

// Save machine-friendly JSON
await writeFile(`${enrichedFolder}/${today}_enriched.json`, JSON.stringify(enrichedData, null, 2));


console.log("Today’s AI enrichment complete!");
