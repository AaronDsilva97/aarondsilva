const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// Environment variables - you'll need to set these in your deployment
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  progress?: number;
  duration?: number;
  preview_url?: string;
}

export interface SpotifyError {
  error: string;
  details?: string;
}

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error('Missing Spotify environment variables');
    return null;
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    console.error('Failed to get Spotify access token:', response.status);
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

export async function getNowPlaying(): Promise<SpotifyTrack | SpotifyError | null> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { error: 'Failed to authenticate with Spotify' };
  }

  try {
    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      // Nothing is currently playing, try recently played
      const recentResponse = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!recentResponse.ok) {
        return null;
      }

      const recentData = await recentResponse.json();
      if (recentData.items && recentData.items.length > 0) {
        const track = recentData.items[0].track;
        return {
          name: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '),
          album: track.album.name,
          image: track.album.images[0]?.url || '/default-album.png',
          url: track.external_urls.spotify,
          isPlaying: false,
          preview_url: track.preview_url,
        };
      }

      return null;
    }

    if (!response.ok) {
      return { error: 'Failed to fetch from Spotify', details: response.statusText };
    }

    const data = await response.json();

    if (!data || !data.item) {
      return null;
    }

    const track = data.item;
    return {
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      image: track.album.images[0]?.url || '/default-album.png',
      url: track.external_urls.spotify,
      isPlaying: data.is_playing,
      progress: data.progress_ms,
      duration: track.duration_ms,
      preview_url: track.preview_url,
    };

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return { error: 'Network error while fetching Spotify data' };
  }
}

// Utility function to format time
export function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}