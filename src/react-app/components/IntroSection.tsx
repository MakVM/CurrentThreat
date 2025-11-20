import { Shield, ChevronDown } from 'lucide-react';

interface IntroSectionProps {
  threatName: string;
}

export default function IntroSection({ threatName }: IntroSectionProps) {
  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col items-center justify-center relative cyber-grid scanline"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      
      <div className="relative z-10 text-center px-4">
        <div className="mb-8 flex justify-center">
          <Shield className="w-24 h-24 text-green-500 glow-text animate-pulse" strokeWidth={1.5} />
        </div>
        
        <div className="mb-4">
          <div className="text-green-400/60 text-sm font-mono mb-2 tracking-widest">
            [CURRENT THREAT DESIGNATION]
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-green-500 glow-text font-mono tracking-tight">
            {threatName}
          </h1>
        </div>
        
        <div className="mt-12 text-green-500/60 font-mono text-xs">
          <div className="animate-pulse">SYSTEM MONITORING ACTIVE</div>
        </div>
      </div>

      <div className="mt-12 text-green-500/60 font-mono text-xs">
  <div className="animate-pulse">Powered by <a href="https://rapidapi.com/cpwatch/api/cpw-tracker" className="hover:text-green-400 transition-colors no-underline">CPW API</a></div>
</div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-green-500/50" />
      </div>
    </section>
  );
}
