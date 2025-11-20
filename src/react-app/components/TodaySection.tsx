import type { ThreatEvent } from '@/shared/types';
import { AlertTriangle, Clock, FileText } from 'lucide-react';

interface TodaySectionProps {
  events: ThreatEvent[];
  threatScore: number;
}

const severityConfig = {
  High: {
    color: 'border-red-500/50 bg-red-950/20',
    textColor: 'text-red-400',
    emoji: '🔴',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
  },
  Medium: {
    color: 'border-yellow-500/50 bg-yellow-950/20',
    textColor: 'text-yellow-400',
    emoji: '🟡',
    glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]'
  },
  Low: {
    color: 'border-green-500/50 bg-green-950/20',
    textColor: 'text-green-400',
    emoji: '🟢',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]'
  }
};

export default function TodaySection({ events, threatScore }: TodaySectionProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Get today's date in a formatted string
  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="today" className="min-h-screen py-20 px-4 cyber-grid relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          {/* Header row with TODAY'S EVENTS and date side by side */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 glow-text font-mono">
              TODAY'S EVENTS
            </h2>
            <div className="mt-4 md:mt-0 inline-block border border-green-500/30 bg-black/80 px-6 py-3 glow-border">
              <div className="text-green-400/60 text-xs font-mono mb-1">CURRENT DATE</div>
              <div className="text-xl font-bold text-green-500 font-mono">{getTodayDate()}</div>
            </div>
          </div>
          
          {/* Threat Score remains below */}
          <div className="inline-block border border-green-500/30 bg-black/80 px-6 py-3 glow-border">
            <div className="text-green-400/60 text-xs font-mono mb-1">DAILY THREAT SCORE</div>
            <div className="text-3xl font-bold text-green-500 font-mono">{threatScore.toFixed(1)}/10</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
  const config = severityConfig[event.severity];
  return (
    <div
      key={event.id}
      className={`border ${config.color} ${config.glow} backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{config.emoji}</span>
        <span className={`text-xs font-mono px-2 py-1 border ${config.color} ${config.textColor}`}>
          {event.severity.toUpperCase()}
        </span>
      </div>

      <h3 className="text-green-400 font-mono text-lg mb-3 leading-tight">
        {event.title}
      </h3>

      <p className="text-green-500/70 text-sm font-mono mb-4 leading-relaxed">
        {event.description}
      </p>

      <div className="space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 group">
  <FileText className="w-3 h-3 text-green-400/60" />
  <a
    href={event.source}
    target="_blank"
    rel="noopener noreferrer"
    className="
      text-green-400/60 
      underline 
      decoration-green-400/20 
      underline-offset-2
      transition-all 
      duration-200
      group-hover:text-green-300 
      group-hover:decoration-green-300
      group-hover:drop-shadow-[0_0_4px_rgba(0,255,140,0.6)]
    "
  >
    Source
  </a>
</div>

        <div className="flex items-center gap-2 text-green-400/60">
          <Clock className="w-3 h-3" />
          <span>{formatTime(event.time)}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400/60">
          <AlertTriangle className="w-3 h-3" />
          <span>{event.classification}</span>
        </div>

        {/* --- Social Share Buttons --- */}
        <div className="mt-4 flex gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
            title="Share on Twitter"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800 transition"
            title="Share on Facebook"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </section>
  );
}
