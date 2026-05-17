import { getWeatherData as getOpenMeteo } from "./openmeteo";
import type { WeatherData } from "./openmeteo";

export type { WeatherData, DailyForecast } from "./openmeteo";
export const getWeatherData: () => Promise<WeatherData> = getOpenMeteo;
