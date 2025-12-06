import type { APIRoute } from 'astro';
import { getNowPlaying } from '../../../lib/spotify';

export const GET: APIRoute = async () => {
  try {
    const track = await getNowPlaying();

    return new Response(JSON.stringify(track), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error in now-playing API:', error);

    return new Response(JSON.stringify({
      error: 'Failed to fetch currently playing track',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};