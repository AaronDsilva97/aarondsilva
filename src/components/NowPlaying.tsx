import { useState, useEffect } from 'react';

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  isPlaying: boolean;
  progress?: number;
  duration?: number;
}

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  url: string;
}

export default function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recentPosts] = useState<BlogPost[]>([
    {
      title: "Building AI Tools That Actually Work",
      date: "3 days ago",
      readTime: "5 min read",
      excerpt: "Lessons learned from shipping AI products that users love...",
      url: "#"
    },
    {
      title: "Why I'm Obsessed with Local-First",
      date: "1 week ago",
      readTime: "8 min read",
      excerpt: "Privacy, performance, and the future of web applications...",
      url: "#"
    },
    {
      title: "WebAssembly in 2025",
      date: "2 weeks ago",
      readTime: "12 min read",
      excerpt: "The current state and future potential of WASM for web developers...",
      url: "#"
    }
  ]);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        const data = await response.json();

        if (data && !data.error) {
          setCurrentTrack({
            name: data.name,
            artist: data.artist,
            album: data.album,
            image: data.image,
            isPlaying: data.isPlaying,
            progress: data.progress ? Math.floor(data.progress / 1000) : undefined,
            duration: data.duration ? Math.floor(data.duration / 1000) : undefined,
          });
        } else {
          // Fallback to mock data if Spotify API fails
          setCurrentTrack(null);
        }
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
        setCurrentTrack(null);
      }
    };

    fetchSpotifyData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Now Playing Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎵</span>
          <h3 className="font-semibold text-white">Now Playing</h3>
        </div>

        {currentTrack ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                {currentTrack.image && currentTrack.image !== "/api/placeholder/64/64" ? (
                  <img
                    src={currentTrack.image}
                    alt={`${currentTrack.album} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-lg">♪</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">
                  {currentTrack.name}
                </div>
                <div className="text-xs text-zinc-400 truncate">
                  {currentTrack.artist}
                </div>
              </div>
              {currentTrack.isPlaying && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
                </div>
              )}
            </div>

            {currentTrack.progress && currentTrack.duration && (
              <div className="w-full bg-zinc-800 rounded-full h-1">
                <div
                  className="bg-emerald-400 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTrack.progress / currentTrack.duration) * 100}%` }}
                ></div>
              </div>
            )}

            <div className="text-xs text-zinc-500">
              Powered by Spotify
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🎧</div>
            <div className="text-sm text-zinc-400">Nothing playing right now</div>
            <div className="text-xs text-zinc-600">
              <a
                href="https://open.spotify.com/user/aarondsilva97"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                Follow me on Spotify →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Recent Thoughts Section */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💭</span>
          <h3 className="font-semibold text-white">Recent Thoughts</h3>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {post.title}
                  </h4>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {index < recentPosts.length - 1 && (
                <div className="border-b border-zinc-800 mt-3 mb-4"></div>
              )}
            </article>
          ))}
        </div>

        <div className="pt-3 mt-4 border-t border-zinc-800">
          <a
            href="#blog"
            className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Read more thoughts →
          </a>
        </div>
      </div>
    </div>
  );
}