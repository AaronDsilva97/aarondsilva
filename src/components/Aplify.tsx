export default function Aplify() {
  const features = [
    'Multi-Vendor', 'Real-Time Inventory', 'Payments', 'Vendor Dashboards',
    'Product Catalog', 'Order Management', 'Analytics', 'Mobile Apps'
  ];

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-purple-600/10 dark:from-purple-600/20 dark:via-pink-600/20 dark:to-purple-600/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="mb-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            CTO @ Aplify®
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            E-commerce SaaS platform
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
              Building scalable <span className="font-semibold text-purple-600 dark:text-purple-400">multi-vendor marketplace</span> infrastructure — leading technical strategy and engineering.
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Cloud-native architecture with real-time operations, vendor management, and mission-critical uptime.
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="text-[9px] px-1.5 py-0.5 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded transition-colors border border-purple-200 dark:border-purple-700/30"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900/20 dark:border-white/20">
            <a
              href="https://www.aplify.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
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
      </div>
    </div>
  );
}
