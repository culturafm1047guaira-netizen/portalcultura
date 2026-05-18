export type BoredActivity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
};

export async function getRandomActivity(): Promise<BoredActivity | null> {
  try {
    const res = await fetch("https://bored-api.appbrewery.com/random", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.error) return null;

    return {
      activity: data.activity,
      type: data.type,
      participants: data.participants,
      price: data.price,
      link: data.link,
    };
  } catch {
    return null;
  }
}
