import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Mock threat intelligence data endpoint
app.get("/api/threat-data", (c) => {
  const threatData = {
    currentThreat: "OPERATION SHADOW BREACH",
    threatScore: 8.4,
    todaysEvents: [
      {
        id: 1,
        title: "Ransomware Campaign Targeting Financial Institutions",
        description: "Multiple banks in EU reported sophisticated phishing attempts",
        source: "CERT-EU",
        time: "2025-11-19T18:45:00Z",
        severity: "High",
        classification: "Ransomware"
      },
      {
        id: 2,
        title: "Zero-Day Vulnerability Disclosed in Apache Framework",
        description: "CVE-2025-12345 allows remote code execution",
        source: "Apache Security Team",
        time: "2025-11-19T14:30:00Z",
        severity: "High",
        classification: "Vulnerability"
      },
      {
        id: 3,
        title: "DDoS Attack on E-commerce Platforms",
        description: "Coordinated attack affecting multiple retail sites",
        source: "CloudFlare",
        time: "2025-11-19T12:15:00Z",
        severity: "Medium",
        classification: "DDoS"
      },
      {
        id: 4,
        title: "Credential Stuffing Attempts Detected",
        description: "Automated login attempts using leaked credentials",
        source: "Akamai",
        time: "2025-11-19T09:00:00Z",
        severity: "Low",
        classification: "Account Takeover"
      },
      {
        id: 5,
        title: "Malicious NPM Package Removed",
        description: "Package containing crypto miner removed from registry",
        source: "npm Security",
        time: "2025-11-19T07:20:00Z",
        severity: "Medium",
        classification: "Malware"
      }
    ],
    past7Days: {
      briefing: "The cybersecurity landscape over the past week has been marked by a significant uptick in ransomware activities, particularly targeting financial and healthcare sectors. Advanced persistent threat (APT) groups have shown increased sophistication in their phishing campaigns, utilizing AI-generated content to bypass traditional security filters.",
      trends: "Key trends include a 34% increase in zero-day exploits compared to the previous week, with particular focus on cloud infrastructure vulnerabilities. Supply chain attacks continue to pose significant risks, with three major incidents reported affecting software distribution channels. Nation-state actors have intensified their reconnaissance activities targeting critical infrastructure.",
      predictions: "Based on current intelligence patterns, we anticipate continued escalation in ransomware-as-a-service (RaaS) operations. The emergence of quantum-resistant encryption discussions suggests threat actors are preparing for post-quantum cryptography transitions. Expect increased targeting of IoT devices and edge computing infrastructure in the coming weeks."
    },
    eventFrequency: [
      { date: "2025-11-13", count: 12 },
      { date: "2025-11-14", count: 18 },
      { date: "2025-11-15", count: 15 },
      { date: "2025-11-16", count: 22 },
      { date: "2025-11-17", count: 19 },
      { date: "2025-11-18", count: 25 },
      { date: "2025-11-19", count: 28 }
    ],
    classificationDistribution: [
      { name: "Ransomware", value: 35 },
      { name: "Phishing", value: 28 },
      { name: "DDoS", value: 15 },
      { name: "Malware", value: 12 },
      { name: "Vulnerability", value: 10 }
    ]
  };

  return c.json(threatData);
});

export default app;
