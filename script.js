async function loadToday() {
  const today = new Date().toISOString().slice(0,10);
  const res = await fetch(`data/today/${today}_enriched.json`);
  const data = await res.json();

  const cardsContainer = document.getElementById("today-cards");
  cardsContainer.innerHTML = data.events.map(e => `
    <div class="card">
      <h3>${e.entities}</h3>
      <p>${e.eventSummary}</p>
      <p>Severity: ${e.severity}</p>
      <p>Tags: ${e.tags.join(", ")}</p>
    </div>
  `).join("");

  document.getElementById("today-summary").innerText =
    `${data.dailyBrief} (Threat score: ${data.overallDayThreatScore})`;
}

loadToday();
