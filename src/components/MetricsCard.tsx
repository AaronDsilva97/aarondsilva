import { useState, useEffect } from 'react';

const START_YEAR = 2018;
const yearsExperience = new Date().getFullYear() - START_YEAR;

const metrics = [
  { label: 'Client Savings', value: 1, prefix: '$', suffix: 'M+', color: 'text-emerald-400' },
  { label: 'AWS Costs Cut', value: 33, suffix: '%', color: 'text-blue-400' },
  { label: 'Products Shipped', value: 15, suffix: '+', color: 'text-purple-400' },
  { label: 'Years Experience', value: yearsExperience, suffix: '+', color: 'text-pink-400' }
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
          <h3 className="font-semibold text-slate-900 dark:text-white">Track Record</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Building secure, scalable systems</p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="text-center">
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {'prefix' in metric && metric.prefix}
              {metric.value < 10
                ? Math.round(animatedValues[index])
                : Math.round(animatedValues[index])
              }
              {metric.suffix}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
              {metric.label}
            </div>
            {'subtext' in metric && (
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                {metric.subtext}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700/30">
        <div className="text-center">
          <span className="text-xs text-slate-500">Currently leading: </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Team of 10 engineers</span>
        </div>
      </div>
    </div>
  );
}