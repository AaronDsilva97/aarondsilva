import { useState, useEffect } from 'react';

const obsessions = [
  "healthcare systems",
  "RAG pipelines & AI",
  "security architecture",
  "full-stack engineering",
  "AWS infrastructure"
];

export default function HeroIntro() {
  const [currentObsession, setCurrentObsession] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

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

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsImageExpanded(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center h-full">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <button
              onClick={() => setIsImageExpanded(true)}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 flex-shrink-0 ring-2 ring-purple-500/20 dark:ring-purple-500/30 hover:ring-purple-400 hover:scale-105 transition-all cursor-pointer"
            >
              <img
                src="/profile.png"
                alt="Aaron Dsilva"
                className="w-full h-full object-cover"
              />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Aaron Dsilva
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Tech Lead | Healthcare Systems | AI & Security | Full-Stack Engineer
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              I architect and build mission-critical healthcare systems end-to-end. From React Native/Flutter apps to Node/Rails/Laravel backends with RAG pipelines—I code the full stack. 10+ FDA/HIPAA apps deployed to 100+ hospitals with 99.9% uptime. I implement security fixes from pen testing (not just reports—actual code) and build RAG systems (Neo4j, Pinecone, Claude API) into production healthcare platforms.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-purple-400">
              <span className="text-sm sm:text-base">Currently focused on</span>
              <span className="font-mono font-medium min-w-[160px] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {displayText}
                <span className="animate-pulse text-purple-400">|</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-3">
            <button
              onClick={() => {
                const element = document.querySelector('[data-section="projects"]');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-sm font-medium hover:shadow-sm hover:shadow-purple-400/20 group cursor-pointer"
            >
              <span>→ See my work</span>
              <div className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <a
              href="https://github.com/AaronDsilva97"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-all text-sm font-medium hover:transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsImageExpanded(false)}
        >
          <div className="relative max-w-lg w-full mx-4 animate-in zoom-in-95 duration-200">
            <img
              src="/profile.png"
              alt="Aaron Dsilva"
              className="w-full h-auto rounded-2xl shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageExpanded(false)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4">Press ESC or click anywhere to close</p>
          </div>
        </div>
      )}
    </>
  );
}
