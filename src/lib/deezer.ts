export type DeezerTrack = {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: { id: number; name: string; picture: string };
  album: { id: number; title: string; cover: string };
};

export type DeezerArtist = {
  id: number;
  name: string;
  picture: string;
  nb_fan: number;
};

export type DeezerCharts = {
  tracks: DeezerTrack[];
  artists: DeezerArtist[];
};

export async function getDeezerCharts(): Promise<DeezerCharts> {
  try {
    const [tracksRes, artistsRes] = await Promise.all([
      fetch("https://api.deezer.com/chart/0/tracks?limit=8", {
        next: { revalidate: 3600 },
      }),
      fetch("https://api.deezer.com/chart/0/artists?limit=6", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!tracksRes.ok || !artistsRes.ok) return { tracks: [], artists: [] };

    const tracksData = await tracksRes.json();
    const artistsData = await artistsRes.json();

    return {
      tracks:
        tracksData.data?.map((t: any) => ({
          id: t.id,
          title: t.title,
          duration: t.duration,
          preview: t.preview,
          artist: { id: t.artist.id, name: t.artist.name, picture: t.artist.picture },
          album: { id: t.album.id, title: t.album.title, cover: t.album.cover },
        })) || [],
      artists:
        artistsData.data?.map((a: any) => ({
          id: a.id,
          name: a.name,
          picture: a.picture,
          nb_fan: a.nb_fan || 0,
        })) || [],
    };
  } catch {
    return { tracks: [], artists: [] };
  }
}
