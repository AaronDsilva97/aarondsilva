import { useState, useEffect } from 'react';

const obsessions = [
  "0→1 product launches",
  "scaling mobile startups",
  "technical co-founding",
  "product-market fit",
  "building MVP to Series A"
];

export default function HeroIntro() {
  const [currentObsession, setCurrentObsession] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const current = obsessions[currentObsession];

      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1));
        setTypeSpeed(75);
      } else {
        setDisplayText(current.substring(0, displayText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentObsession((prev) => (prev + 1) % obsessions.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentObsession, typeSpeed]);

  return (
    <div className="flex flex-col justify-center h-full opacity-0 animate-pulse">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20 flex-shrink-0">
            AD
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Aaron D'silva
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Technical Co-Founder & Product Builder
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-lg text-slate-300 leading-relaxed">
            I help ambitious founders build and scale mobile products from zero to Series A. 3 startups co-founded, 2 successful exits.
          </p>

          <div className="flex items-center gap-2 text-purple-400">
            <span>Currently focused on</span>
            <span className="font-mono font-medium min-w-[160px] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayText}
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-slate-100 hover:text-purple-400 transition-all text-sm font-medium hover:shadow-sm hover:shadow-purple-400/20 group"
          >
            <span>→ See my work</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <a
            href="https://github.com/AaronDsilva97"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-all text-sm font-medium hover:transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}