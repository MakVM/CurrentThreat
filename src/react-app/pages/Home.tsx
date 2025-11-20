import { useThreatData } from '@/react-app/hooks/useThreatData';
import Navigation from '@/react-app/components/Navigation';
import IntroSection from '@/react-app/components/IntroSection';
import TodaySection from '@/react-app/components/TodaySection';
import Past7DaysSection from '@/react-app/components/Past7DaysSection';
import ChartsSection from '@/react-app/components/ChartsSection';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const { data, loading, error } = useThreatData();

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="animate-spin mb-4">
          <Loader2 className="w-10 h-10 text-green-500" />
        </div>
        <div className="text-green-500 font-mono text-sm animate-pulse">
          LOADING THREAT DATA...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <div className="text-red-500 font-mono text-sm">
          ERROR: {error || 'Failed to load threat data'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-green-500 min-h-screen">
      <Navigation onNavigate={handleNavigate} />
      
      <IntroSection threatName={data.currentThreat} />
      
      <TodaySection 
        events={data.todaysEvents} 
        threatScore={data.threatScore} 
      />
      
      <Past7DaysSection
        briefing={data.past7Days.briefing}
        trends={data.past7Days.trends}
        predictions={data.past7Days.predictions}
      />
      
      <ChartsSection
        eventFrequency={data.eventFrequency}
        classificationDistribution={data.classificationDistribution}
      />
    </div>
  );
}
