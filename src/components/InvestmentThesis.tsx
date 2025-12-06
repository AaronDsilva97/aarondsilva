import { useState } from 'react';

const focusAreas = [
  {
    icon: '📱',
    area: 'Mobile-First',
    description: 'Cross-platform apps that scale'
  },
  {
    icon: '🤖',
    area: 'AI Integration',
    description: 'Practical AI that solves real problems'
  },
  {
    icon: '⚡',
    area: 'B2B SaaS',
    description: 'High-growth enterprise solutions'
  },
  {
    icon: '🏥',
    area: 'HealthTech',
    description: 'Improving healthcare outcomes'
  }
];

export default function InvestmentThesis() {
  const [activeArea, setActiveArea] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Investment Focus</h3>
        <p className="text-sm text-slate-400">Industries & ideas I'm passionate about</p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {focusAreas.map((area, index) => (
          <button
            key={index}
            onClick={() => setActiveArea(index)}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              activeArea === index
                ? 'bg-purple-600/20 border-2 border-purple-400/40'
                : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <div className="text-xl mb-2">{area.icon}</div>
            <div className="text-sm font-medium text-white mb-1">{area.area}</div>
            <div className="text-xs text-slate-400">{area.description}</div>
          </button>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-700/30">
        <div className="text-xs text-slate-400">
          Looking for: <span className="text-emerald-400">Pre-seed to Series A</span>
        </div>
      </div>
    </div>
  );
}