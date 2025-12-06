import { useState, useEffect } from 'react';

const metrics = [
  { label: 'Startups Co-Founded', value: 3, suffix: '', color: 'text-purple-400' },
  { label: 'Successful Exits', value: 2, suffix: '', color: 'text-emerald-400' },
  { label: 'Total ARR Generated', value: 2.1, suffix: 'M', color: 'text-blue-400' },
  { label: 'Users Impacted', value: 150, suffix: 'K+', color: 'text-pink-400' }
];

export default function MetricsCard() {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(metrics.map(metric => metric.value * easeOut));

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📊</span>
          <h3 className="font-semibold text-white">Track Record</h3>
        </div>
        <p className="text-xs text-slate-400">Building successful ventures</p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="text-center">
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value < 10
                ? Math.round(animatedValues[index])
                : Math.round(animatedValues[index] * 10) / 10
              }
              {metric.suffix}
            </div>
            <div className="text-xs text-slate-400 leading-tight">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-700/30">
        <div className="text-center">
          <span className="text-xs text-slate-500">Average time to exit: </span>
          <span className="text-xs text-emerald-400 font-medium">3.2 years</span>
        </div>
      </div>
    </div>
  );
}