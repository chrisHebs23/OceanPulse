import { z } from "zod";

export const oceanApiSchema = z.object({
  wave_height: z.number(),
  wave_period: z.number(),
  wave_direction: z.number(),
  swell_wave_height: z.number(),
  swell_wave_period: z.number(),
  wind_wave_height: z.number(),
  sea_surface_temperature: z.number(),
});

export const messageSchema = z.object({
  overall_condition: z.string(),
  safe_for_swimming: z.boolean(),
  good_surfing_conditions: z.boolean(),
  key_highlights: z.array(z.string()),
  gemini_analysis: z.string(),
});

export type OceanApiResponse = z.infer<typeof oceanApiSchema>;

export type GeminiResponse = z.infer<typeof messageSchema>;

export interface Prompt {
  role: "user";
  text: OceanApiResponse;
}

export interface AiResponse {
  role: "model";
  text: GeminiResponse;
}

export interface LonLat {
  lat: number;
  lon: number;
}

export interface LonLatList {
  label: string;
  value: LonLat;
}
