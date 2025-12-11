export default function Itihaas() {
  const entities = [
    'People', 'Dynasties', 'Events', 'Places', 'Monuments',
    'Timelines', 'Artifacts', 'Concepts', 'Stories', 'Maps',
    'Creative Works', 'Cuisine', 'Institutions', 'Trade Routes', 'Languages'
  ];

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: 'url(/images/hero-home.webp)' }}
        />
        {/* Light mode: lighter overlay, Dark mode: darker overlay */}
        <div className="absolute inset-0 bg-white/60 dark:bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            Maintainer @ itihaas.ai
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Where tech meets heritage
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
              Explore <span className="font-semibold text-purple-600 dark:text-purple-400">5,000 years</span> of Indian history — from the Indus Valley to Independence.
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A comprehensive platform documenting India's epic story through 15+ interconnected categories.
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {entities.map((entity, index) => (
                <span
                  key={index}
                  className="text-[9px] px-1.5 py-0.5 bg-slate-900/10 hover:bg-slate-900/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 rounded backdrop-blur-sm transition-colors border border-slate-900/10 dark:border-white/10"
                >
                  {entity}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900/20 dark:border-white/20">
            <a
              href="https://itihaas.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
            >
              <span>Explore Platform</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          50% {
            transform: scale(1.1) translateX(-2%) translateY(-2%);
          }
          100% {
            transform: scale(1) translateX(0) translateY(0);
          }
        }

        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
