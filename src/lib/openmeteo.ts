const LAT = -20.3186;
const LON = -48.3108;
const CITY = "Guaíra, SP";

export type DailyForecast = {
  date: string;
  weekday: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  precipitation: number;
  wind: number;
};

export type WeatherData = {
  temp: string;
  condition: string;
  feelsLike: string;
  max: string;
  min: string;
  humidity: string;
  wind: string;
  daily: DailyForecast[];
};

const WMO_CODES: Record<number, { text: string; icon: string }> = {
  0:  { text: "Céu limpo", icon: "☀️" },
  1:  { text: "Predom. limpo", icon: "🌤️" },
  2:  { text: "Parcial. nublado", icon: "⛅" },
  3:  { text: "Encoberto", icon: "☁️" },
  45: { text: "Nevoeiro", icon: "🌫️" },
  48: { text: "Geada", icon: "🌫️" },
  51: { text: "Garoa fraca", icon: "🌦️" },
  53: { text: "Garoa mod.", icon: "🌦️" },
  55: { text: "Garoa forte", icon: "🌧️" },
  61: { text: "Chuva fraca", icon: "🌦️" },
  63: { text: "Chuva mod.", icon: "🌧️" },
  65: { text: "Chuva forte", icon: "🌧️" },
  71: { text: "Neve fraca", icon: "❄️" },
  73: { text: "Neve mod.", icon: "❄️" },
  75: { text: "Neve forte", icon: "❄️" },
  80: { text: "Pancada chuva", icon: "🌦️" },
  81: { text: "Pancada mod.", icon: "🌧️" },
  82: { text: "Pancada forte", icon: "🌧️" },
  95: { text: "Tempestade", icon: "⛈️" },
  96: { text: "Temp. granizo", icon: "⛈️" },
  99: { text: "Temp. granizo", icon: "⛈️" },
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getCondition(code: number): { text: string; icon: string } {
  return WMO_CODES[code] || { text: "Desconhecido", icon: "❓" };
}

export async function getWeatherData(): Promise<WeatherData> {
  const fallback: WeatherData = {
    temp: "28", condition: "Ensolarado", feelsLike: "30",
    max: "31", min: "19", humidity: "45%", wind: "10 km/h",
    daily: [],
  };

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=America/Sao_Paulo&forecast_days=7`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;

    const data = await res.json();
    const curr = data.current;

    const daily: DailyForecast[] = (data.daily.time as string[]).map((date: string, i: number) => {
      const dt = new Date(date + "T12:00:00");
      const wc = getCondition(data.daily.weather_code[i]);
      return {
        date,
        weekday: WEEKDAYS[dt.getDay()],
        tempMax: Math.round(data.daily.temperature_2m_max[i]),
        tempMin: Math.round(data.daily.temperature_2m_min[i]),
        condition: wc.text,
        icon: wc.icon,
        precipitation: data.daily.precipitation_sum[i] || 0,
        wind: Math.round(data.daily.wind_speed_10m_max[i] || 0),
      };
    });

    const currentCondition = getCondition(curr.weather_code);

    return {
      temp: Math.round(curr.temperature_2m).toString(),
      condition: currentCondition.text,
      feelsLike: Math.round(curr.apparent_temperature).toString(),
      max: Math.round(data.daily.temperature_2m_max[0]).toString(),
      min: Math.round(data.daily.temperature_2m_min[0]).toString(),
      humidity: `${curr.relative_humidity_2m}%`,
      wind: `${Math.round(curr.wind_speed_10m)} km/h`,
      daily,
    };
  } catch {
    return fallback;
  }
}
