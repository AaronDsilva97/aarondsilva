export default function SecurityExpertise() {
  const securityAreas = [
    {
      name: 'Pen Test → Production',
      description: 'Translate security findings into actual code fixes & architecture',
      icon: '🔍'
    },
    {
      name: 'Compliance Engineering',
      description: 'FDA, HIPAA, GDPR, SOC2, ISO 27001 implementation',
      icon: '✅'
    },
    {
      name: 'Secure AI Pipelines',
      description: 'HIPAA-compliant embeddings, encrypted vector storage',
      icon: '🔒'
    },
    {
      name: 'Production Hardening',
      description: 'Disaster recovery, encrypted backups, secure auth flows',
      icon: '🛡️'
    }
  ];

  const certifications = [
    'HIPAA',
    'GDPR',
    'FDA',
    'SOC2',
    'ISO 27001'
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🛡️</span>
          <h3 className="font-semibold text-slate-900 dark:text-white">Security Architecture</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Not just compliant—actually secure
        </p>
      </div>

      <div className="space-y-2.5 mb-4 flex-1">
        {securityAreas.map((area, index) => (
          <div
            key={index}
            className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30"
          >
            <div className="flex items-start gap-2">
              <div className="text-xl flex-shrink-0">{area.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">
                  {area.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {area.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/30">
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          Compliance Standards:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {certifications.map((cert, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded border border-blue-200 dark:border-blue-700/30 font-medium"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
