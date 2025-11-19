import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

async function generateRollingEnriched() {
  const enrichedDir = "data/today";
  const rollingDir = "data/rolling";
  await mkdir(rollingDir, { recursive: true });

  // Read all enriched files
  const files = await readdir(enrichedDir);

  // Only JSON files ending with _enriched.json
  const enrichedFiles = files
    .filter(f => f.endsWith("_enriched.json"))
    .sort()                // sorted by date due to filename format
    .slice(-7);            // keep last 7

  if (enrichedFiles.length === 0) {
    console.log("No enriched daily files found. Skipping.");
    return;
  }

  // Load each day's enriched data
  const days = [];

  for (const file of enrichedFiles) {
    const filePath = path.join(enrichedDir, file);
    const json = JSON.parse(await readFile(filePath, "utf-8"));

    // extract date from "YYYY-MM-DD_enriched.json"
    const date = file.replace("_enriched.json", "");

    days.push({
      date,
      events: json.events,
      overallDayThreatScore: json.overallDayThreatScore,
      dailyBrief: json.dailyBrief
    });
  }

  // Build final rolling object
  const rollingData = {
    startDate: days[0].date,
    endDate: days[days.length - 1].date,
     // sorted oldest → newest
    days
  };

  // Save final 7-day merged file
  const outputFile = path.join(rollingDir, "enriched_7days.json");

  await writeFile(outputFile, JSON.stringify(rollingData, null, 2));
  console.log(`Generated rolling enriched file → ${outputFile}`);
}

generateRollingEnriched().catch(err => {
  console.error("Rolling generation failed:", err);
  process.exit(1);
});
