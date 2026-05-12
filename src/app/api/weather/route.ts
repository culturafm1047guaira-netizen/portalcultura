import { NextResponse } from "next/server";

export async function GET() {
  const location = process.env.WEATHER_LOCATION || "Guaíra,SP";
  const encodedLocation = encodeURIComponent(location);

  try {
    const response = await fetch(`https://wttr.in/${encodedLocation}?format=j1`, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json({ temp: "N/D", condition: "Indisponível" });
    }

    const data = await response.json();
    const current = data.current_condition?.[0];
    const today = data.weather?.[0];

    if (!current || !today) {
      return NextResponse.json({ temp: "N/D", condition: "Indisponível" });
    }

    return NextResponse.json({
      temp: current.temp_C || "N/D",
      condition: current.lang_pt?.[0]?.value || "Indisponível",
      feelsLike: current.FeelsLikeC || "N/D",
      max: today.maxtempC || "N/D",
      min: today.mintempC || "N/D",
      humidity: current.humidity ? `${current.humidity}%` : "N/D",
      wind: current.windspeedKmph ? `${current.windspeedKmph} km/h` : "N/D",
    });
  } catch {
    return NextResponse.json({ temp: "N/D", condition: "Clima indisponível" });
  }
}
