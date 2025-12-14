export default function HealthcareExpertise() {
  const achievements = [
    {
      icon: '🏥',
      label: '10+ Healthcare Apps',
      detail: 'FDA, HIPAA, GDPR certified systems'
    },
    {
      icon: '🌍',
      label: '100+ Hospitals',
      detail: 'Deployed across US, EU, India markets'
    },
    {
      icon: '⚡',
      label: '99.9% Uptime',
      detail: 'Mission-critical reliability & disaster recovery'
    },
    {
      icon: '📱',
      label: 'Offline-First',
      detail: 'Real-time sync, harsh conditions, zero data loss'
    }
  ];

  const clients = [
    'King\'s College London',
    'Johnson & Johnson',
    'European Hospital Network',
    'US Healthcare Providers'
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🏥</span>
          <h3 className="font-semibold text-slate-900 dark:text-white">Healthcare Expertise</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Mission-critical systems that save lives
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">
              {item.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
              {item.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/30">
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          Notable Clients:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {clients.map((client, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded border border-emerald-200 dark:border-emerald-700/30"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
