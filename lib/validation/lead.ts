import { z } from "zod";

export const leadSchema = z.object({
  landingSlug: z.string().min(1).max(100),
  name: z.string().max(120).optional().default(""),
  email: z.string().max(320).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  company: z.string().max(120).optional().default(""),
  jobTitle: z.string().max(120).optional().default(""),
  honeypot: z.string().max(500).optional().default(""),
  ctaVariant: z.string().min(1).max(60),
  submitMode: z.enum(["signup", "feedback"]).default("signup"),
  referrer: z.string().max(500).optional().default(""),
  utm: z.object({
    source: z.string().max(120).optional().default(""),
    medium: z.string().max(120).optional().default(""),
    campaign: z.string().max(120).optional().default(""),
    term: z.string().max(120).optional().default(""),
    content: z.string().max(120).optional().default("")
  })
});

export type LeadPayload = z.infer<typeof leadSchema>;
