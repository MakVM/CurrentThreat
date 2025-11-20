import OpenAI from "openai";
import { readFile, writeFile, mkdir } from "fs/promises";

const token = process.env.OPENAI_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

function capitalizeTags(tags) {
  if (!tags) return ["Other"];
  return tags.map(tag => 
    tag.split(' ')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
       .join(' ')
  );
}

async function main() {
  const todayDate = new Date().toISOString().slice(0, 10);
  const todayFile = `data/today/${todayDate}_enriched.json`;
  const rollingFile = `data/rolling/enriched_7days.json`;
  const weeklyAIFile = `data/rolling/weekly_ai.json`;

  const todayData = JSON.parse(await readFile(todayFile, "utf-8"));
  const rollingData = JSON.parse(await readFile(rollingFile, "utf-8"));
  const weeklyAI = JSON.parse(await readFile(weeklyAIFile, "utf-8"));

  // ------------------------------------------
  // Compute eventFrequency (per day counts)
  // ------------------------------------------
  const eventFrequency = rollingData.days.map(day => ({
    date: day.date,
    count: day.events.length
  }));

  // ------------------------------------------
  // Compute classificationDistribution
  // ------------------------------------------
  const classCount = {};
  for (const day of rollingData.days) {
    for (const ev of day.events) {
      const tag = ev.tags || "other";
      classCount[tag] = (classCount[tag] || 0) + 1;
    }
  }

  const classificationDistribution = Object.entries(classCount).map(([name, value]) => ({
    name: capitalizeTags([name])[0], // Capitalize for distribution too
    value
  }));

  // ------------------------------------------
  // Prepare today's events in website-friendly shape
  // ------------------------------------------
  const todaysEvents = todayData.events.map((ev, i) => ({
    id: i + 1,
    title: ev.entities,
    description: ev.eventSummary,
    source: ev.source,
    time: ev.timestamp,
    severity: ev.severity,
    classification: capitalizeTags(ev.tags || ["other"]) // Apply capitalization here
  }));

  // ------------------------------------------
  // Use AI to generate currentThreat + threatScore
  // ------------------------------------------
  const aiPrompt = `
You are a cyber threat analyst.

Generate:
1. "currentThreat": a short codename summarizing today's cyber landscape (e.g., "OPERATION SHADOW BREACH")
2. "threatScore": a number from 0.0 to 10.0 representing overall severity

Base this on today's enriched data:

${JSON.stringify(todayData, null, 2)}

Return ONLY JSON:
{
  "currentThreat": "...",
  "threatScore": 0-10
}
`;

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: "Return ONLY valid JSON exactly as instructed." },
      { role: "user", content: aiPrompt }
    ],
    temperature: 0.5
  });

  const threatMeta = JSON.parse(response.choices[0].message.content);

  // ------------------------------------------
  // Final merged JSON
  // ------------------------------------------
  const final = {
    currentThreat: threatMeta.currentThreat,
    threatScore: threatMeta.threatScore,
    todaysEvents,
    past7Days: {
      briefing: weeklyAI.weeklyBrief,
      trends: weeklyAI.trends,
      predictions: weeklyAI.predictions
    },
    eventFrequency,
    classificationDistribution
  };

  await mkdir("data/website", { recursive: true });
  await writeFile("data/website/combined.json", JSON.stringify(final, null, 2));

  console.log("✅ Website combined JSON generated at data/website/combined.json");
}

main();

