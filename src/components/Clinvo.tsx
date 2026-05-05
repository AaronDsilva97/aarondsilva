export default function Clinvo() {
  const features = [
    'AI Scribe',
    'Smart Rx',
    'Clinical Decision Support',
    'Specialty Templates',
    'Telehealth',
    'Lab Integration',
    'Patient Portal',
    'Appointments',
    'Voice Notes',
    'Analytics',
  ];

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-teal-500/10 dark:from-cyan-500/20 dark:via-blue-600/20 dark:to-teal-500/20" />

      {/* Subtle pulse line */}
      <svg
        className="absolute inset-x-0 bottom-0 z-0 w-full h-16 opacity-[0.08] dark:opacity-[0.18] pointer-events-none"
        viewBox="0 0 600 60"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          className="text-cyan-700 dark:text-cyan-300"
          d="M0 30 H120 L140 30 L150 10 L165 50 L180 20 L195 40 L210 30 H340 L355 10 L370 50 L385 20 L400 40 L415 30 H600"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full p-6 gap-4 md:gap-6">
        {/* Left: title, description, CTA */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              Technical Creator @ clinvo.health
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              The clinic OS that thinks like a specialist
            </p>
          </div>

          <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
            An{' '}
            <span className="font-semibold text-cyan-700 dark:text-cyan-400">
              AI-native EHR + PHR
            </span>{' '}
            for modern clinics, with ambient scribing, smart prescriptions, and
            specialty-aware workflows for doctors and patients.
          </p>

          <div className="mt-auto pt-3 border-t border-slate-900/20 dark:border-white/20">
            <a
              href="https://clinvo.health/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors group"
            >
              <span>Visit Platform</span>
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

        {/* Right: feature tag grid */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="flex flex-wrap gap-1.5">
            {features.map((feature, index) => (
              <span
                key={index}
                className="text-[10px] px-2 py-1 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:hover:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 rounded transition-colors border border-cyan-200 dark:border-cyan-700/30"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
