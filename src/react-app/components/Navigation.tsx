import { Menu } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <div className="relative group">
        <button className="text-green-500 hover:text-green-400 transition-colors glow-text">
          <Menu className="w-6 h-6" />
        </button>
        <div className="absolute right-0 mt-2 w-56 bg-black/95 border border-green-500/30 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="p-2 space-y-1">
            <button
              onClick={() => onNavigate('intro')}
              className="w-full text-left px-4 py-2 text-green-500 hover:bg-green-500/10 font-mono text-sm transition-colors"
            >
              &gt; THREAT STATUS
            </button>
            <button
              onClick={() => onNavigate('today')}
              className="w-full text-left px-4 py-2 text-green-500 hover:bg-green-500/10 font-mono text-sm transition-colors"
            >
              &gt; TODAY'S EVENTS
            </button>
            <button
              onClick={() => onNavigate('past7days')}
              className="w-full text-left px-4 py-2 text-green-500 hover:bg-green-500/10 font-mono text-sm transition-colors"
            >
              &gt; 7-DAY ANALYSIS
            </button>
            <button
              onClick={() => onNavigate('charts')}
              className="w-full text-left px-4 py-2 text-green-500 hover:bg-green-500/10 font-mono text-sm transition-colors"
            >
              &gt; DATA VISUALIZATION
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
