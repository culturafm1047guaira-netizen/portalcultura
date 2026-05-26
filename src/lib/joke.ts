export type JokeData = {
  setup: string;
  punchline: string;
  category: string;
};

function translateJoke(joke: any): JokeData | null {
  if (!joke) return null;

  if (joke.type === "single") {
    return {
      setup: joke.joke || "",
      punchline: "",
      category: joke.category || "geral",
    };
  }

  if (joke.type === "twopart") {
    return {
      setup: joke.setup || "",
      punchline: joke.delivery || "",
      category: joke.category || "geral",
    };
  }

  return null;
}

export async function getJoke(): Promise<JokeData | null> {
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Any?lang=pt&blacklistFlags=nsfw,religious,political,racist,sexist,explicit",
      { next: { revalidate: 7200 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    return translateJoke(data);
  } catch {
    return null;
  }
}
