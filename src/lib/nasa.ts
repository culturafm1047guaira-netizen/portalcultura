export type ApodData = {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  copyright?: string;
};

export async function getApod(): Promise<ApodData | null> {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title || "Sem título",
      explanation: data.explanation || "",
      url: data.url || "",
      hdurl: data.hdurl || undefined,
      date: data.date || "",
      copyright: data.copyright || undefined,
    };
  } catch {
    return null;
  }
}
