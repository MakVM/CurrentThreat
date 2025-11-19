async function loadToday() {
  const today = new Date().toISOString().slice(0,10);
  const res = await fetch(`data/today/${today}_enriched.json`);
  const data = await res.json();

const cardsContainer = document.getElementById("today-cards");
cardsContainer.innerHTML = data.events.map(e => {
  // Extract the source URL from the eventSummary
  let source = "";
  let summary = e.eventSummary;

  const match = summary.match(/Sources:-\s*(https?:\/\/\S+)/);
  if (match) {
    source = match[1]; // the URL
    summary = summary.replace(match[0], "").trim(); // remove "Sources:- URL"
  }

  return `
    <div class="card">
      <p>${summary}</p>
      <p>Severity: ${e.severity}</p>
      <p>Tags: ${e.tags.join(", ")}</p>
      ${source ? `<p>Source: <a href="${source}" target="_blank">${source}</a></p>` : ""}
    </div>
  `;
}).join("");

  document.getElementById("today-summary").innerText =
    `${data.dailyBrief} (Threat score: ${data.overallDayThreatScore})`;
}

loadToday();
