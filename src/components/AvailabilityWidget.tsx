import { useState, useEffect } from 'react';

interface AvailabilityStatus {
  available: boolean;
  status: string;
  timezone: string;
  localTime: string;
  nextAvailable?: string;
}

export default function AvailabilityWidget() {
  const [status, setStatus] = useState<AvailabilityStatus>({
    available: true,
    status: 'Available for interesting projects',
    timezone: 'PST',
    localTime: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Update for Indian Standard Time since he's working at The Lean Product Studio (likely in India)
      const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
      });

      const hour = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        hour12: false
      });
      const currentHour = parseInt(hour);
      const isWorkingHours = currentHour >= 9 && currentHour <= 18;

      setStatus(prev => ({
        ...prev,
        localTime: timeString,
        timezone: 'IST',
        available: isWorkingHours,
        status: isWorkingHours
          ? 'Available for healthcare & compliance projects'
          : 'Currently offline • Open to interesting projects',
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center h-full opacity-100 transition-opacity duration-1000">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`relative w-4 h-4 rounded-full ${
            status.available ? 'bg-emerald-400' : 'bg-orange-400'
          }`}>
            <div className={`absolute inset-0 rounded-full ${
              status.available ? 'bg-emerald-400 animate-ping' : ''
            }`} />
            <div className={`relative w-full h-full rounded-full ${
              status.available ? 'bg-emerald-400' : 'bg-orange-400'
            }`} />
          </div>
          <span className={`text-sm font-semibold ${
            status.available ? 'text-emerald-300' : 'text-orange-300'
          }`}>
            {status.available ? '🟢 Available' : '🟡 Offline'}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            {status.status}
          </p>

          <div className="text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <span className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Local time:
              </span>
              <span className="font-mono text-slate-300">{status.localTime} {status.timezone}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
              <span className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Response time:
              </span>
              <span className="text-emerald-400 font-medium">~6 hours</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => window.open('mailto:contact@aarondsilva.me?subject=Project Inquiry', '_blank')}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all hover-lift glow-effect"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Get in Touch
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}