import { readFile, writeFile, mkdir } from "fs/promises";
import OpenAI from "openai"; // GitHub Models uses OpenAI SDK

const client = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN // Or your model token
});

// Get today’s date
const today = new Date().toISOString().slice(0, 10);
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

const response = await client.responses.create({
  model: "gpt-4.1",  // Or the model name you have access to
  input: prompt,
  max_output_tokens: 1000
});

// The model output text
const outputText = response.output_text;

const enrichedData = JSON.parse(outputText);

await mkdir(enrichedFolder, { recursive: true });

// Save machine-friendly JSON
await writeFile(`${enrichedFolder}/${today}_enriched.json`, JSON.stringify(enrichedData, null, 2));


console.log("Today’s AI enrichment complete!");
