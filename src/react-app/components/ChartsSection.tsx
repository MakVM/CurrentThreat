import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { EventFrequency, ClassificationDistribution } from '@/shared/types';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface ChartsSectionProps {
  eventFrequency: EventFrequency[];
  classificationDistribution: ClassificationDistribution[];
}

const COLORS = ['#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b'];

export default function ChartsSection({ eventFrequency, classificationDistribution }: ChartsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section id="charts" className="min-h-screen py-20 px-4 cyber-grid relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-green-500 glow-text font-mono mb-12">
          DATA VISUALIZATION
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="border border-green-500/30 bg-black/80 p-6 glow-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-mono text-green-400">CRITICAL EVENT FREQUENCY (7 DAYS)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 0, 0.1)" />
                <XAxis
                  dataKey="date"
                  ticks={eventFrequency.map(d => d.date)}
                  tickFormatter={formatDate}
                  stroke="#00ff00"
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px' }}
                /> 

                <YAxis 
                  stroke="#00ff00"
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.95)', 
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: '#00ff00' }}
                  itemStyle={{ color: '#10b981' }}
                  labelFormatter={formatDate}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#00ff00', r: 4 }}
                  activeDot={{ r: 6, fill: '#00ff00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="border border-green-500/30 bg-black/80 p-6 glow-border backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-mono text-green-400">THREAT CLASSIFICATION</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classificationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classificationDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.95)', 
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Legend 
                  wrapperStyle={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    color: '#00ff00'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-12 text-center text-green-500/40 font-mono text-xs">
          <div>[ END OF REPORT ]</div>
          <div className="mt-2">SYSTEM STATUS: OPERATIONAL</div>
        </div>
      </div>
    </section>
  );
}
