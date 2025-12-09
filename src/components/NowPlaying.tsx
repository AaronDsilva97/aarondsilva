import { useState, useEffect } from 'react';

export default function NowPlaying() {
  const [isDark, setIsDark] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const wasDark = isDark;
          const nowDark = document.documentElement.classList.contains('dark');
          if (wasDark !== nowDark) {
            setIsDark(nowDark);
            // Force iframe reload by changing key
            setKey(prev => prev + 1);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isDark]);

  // Spotify theme: 0 = dark, omit or 1 = light
  const spotifyUrl = isDark
    ? "https://open.spotify.com/embed/playlist/0JPk3EmVxlnBt8cnl4rCKf?utm_source=generator&theme=0"
    : "https://open.spotify.com/embed/playlist/0JPk3EmVxlnBt8cnl4rCKf?utm_source=generator";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎵</span>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Vibes</h3>
      </div>

      <div className="flex-1 -mx-2 -mb-2">
        <iframe
          key={key}
          src={spotifyUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg min-h-[152px]"
        />
      </div>
    </div>
  );
}
