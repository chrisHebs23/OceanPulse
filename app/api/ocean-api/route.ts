import { oceanApiSchema } from "@/app/constants/interfaces";

const BASE_URL = "https://marine-api.open-meteo.com/v1/marine";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || "34.0";
    const lon = searchParams.get("lon") || "-119.0";

    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current:
        "wave_height,wave_direction,wave_period,sea_surface_temperature,ocean_current_velocity,ocean_current_direction,swell_wave_height,swell_wave_period,wind_wave_height",
      hourly: "wave_height,wave_direction,wave_period,sea_surface_temperature",
      daily: "wave_height_max,wave_direction_dominant,wave_period_max",
      timezone: "auto",
    });

    const res = await fetch(`${BASE_URL}?${params}`);

    if (!res.ok) {
      const error = await res.json();
      return Response.json({ error }, { status: res.status });
    }

    const data = await res.json();

    const parsed = oceanApiSchema.safeParse({
      wave_height: data.current.wave_height,
      wave_period: data.current.wave_period,
      wave_direction: data.current.wave_direction,
      swell_wave_height: data.current.swell_wave_height,
      swell_wave_period: data.current.swell_wave_period,
      wind_wave_height: data.current.wind_wave_height,
      sea_surface_temperature: data.current.sea_surface_temperature,
    });

    if (!parsed.success) {
      return Response.json({ error: "Invalid API response" });
    }

    return Response.json(parsed.data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch: " + error },
      { status: 500 },
    );
  }
}
