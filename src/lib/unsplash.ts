export type UnsplashPhoto = {
  url: string;
  thumb: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
};

export async function getUnsplashImage(query: string): Promise<UnsplashPhoto | null> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${apiKey}` },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      url: data.urls?.regular || "",
      thumb: data.urls?.thumb || "",
      alt: data.alt_description || "",
      photographer: data.user?.name || "",
      photographerUrl: data.user?.links?.html || "",
    };
  } catch {
    return null;
  }
}
