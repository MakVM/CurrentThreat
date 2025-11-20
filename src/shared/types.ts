import z from "zod";

export const ThreatEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  source: z.string(),
  time: z.string(),
  severity: z.enum(["Low", "Medium", "High"]),
  classification: z.string(),
});

export const EventFrequencySchema = z.object({
  date: z.string(),
  count: z.number(),
});

export const ClassificationDistributionSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const ThreatDataSchema = z.object({
  currentThreat: z.string(),
  threatScore: z.number(),
  todaysEvents: z.array(ThreatEventSchema),
  past7Days: z.object({
    briefing: z.string(),
    trends: z.string(),
    predictions: z.string(),
  }),
  eventFrequency: z.array(EventFrequencySchema),
  classificationDistribution: z.array(ClassificationDistributionSchema),
});

export type ThreatEvent = z.infer<typeof ThreatEventSchema>;
export type EventFrequency = z.infer<typeof EventFrequencySchema>;
export type ClassificationDistribution = z.infer<typeof ClassificationDistributionSchema>;
export type ThreatData = z.infer<typeof ThreatDataSchema>;
