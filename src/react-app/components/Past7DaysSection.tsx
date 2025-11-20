import { TrendingUp, Activity, Zap } from 'lucide-react';

interface Past7DaysSectionProps {
  briefing: string;
  trends: string;
  predictions: string;
}

export default function Past7DaysSection({ briefing, trends, predictions }: Past7DaysSectionProps) {

  const shareToTwitter = (text: string) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;

  const shareToFacebook = () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  return (
    <section id="past7days" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-green-500 glow-text font-mono mb-12">
          7-DAY ANALYSIS
        </h2>

        <div className="space-y-8">

          {/* EXECUTIVE BRIEFING */}
          <div className="border border-green-500/30 bg-black/80 p-8 glow-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-mono text-green-400">EXECUTIVE BRIEFING</h3>
            </div>
            <p className="text-green-500/80 font-mono text-sm leading-relaxed mb-4">
              {briefing}
            </p>

            {/* Social Share */}
            <div className="flex gap-2">
              <a
                href={shareToTwitter(briefing)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                Twitter
              </a>
              <a
                href={shareToFacebook()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800 transition"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* KEY TRENDS */}
          <div className="border border-green-500/30 bg-black/80 p-8 glow-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-mono text-green-400">KEY TRENDS</h3>
            </div>
            <p className="text-green-500/80 font-mono text-sm leading-relaxed mb-4">
              {trends}
            </p>

            {/* Social Share */}
            <div className="flex gap-2">
              <a
                href={shareToTwitter(trends)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                Twitter
              </a>
              <a
                href={shareToFacebook()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800 transition"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* PREDICTIONS */}
          <div className="border border-green-500/30 bg-black/80 p-8 glow-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-mono text-green-400">PREDICTIONS</h3>
            </div>
            <p className="text-green-500/80 font-mono text-sm leading-relaxed mb-4">
              {predictions}
            </p>

            {/* Social Share */}
            <div className="flex gap-2">
              <a
                href={shareToTwitter(predictions)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                Twitter
              </a>
              <a
                href={shareToFacebook()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800 transition"
              >
                Facebook
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
