
import React from 'react';
import { CalculationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  result: CalculationResult | null;
  loading: boolean;
}

const ResultsDisplay: React.FC<Props> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-6 bg-white/50 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-amber-200">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-100 border-t-amber-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="animate-pulse text-amber-600">✨</span>
          </div>
        </div>
        <p className="text-amber-900 font-bold tracking-tight animate-pulse">Our AI Counselor is analyzing the profile...</p>
      </div>
    );
  }

  if (!result) return null;

  const isAlimony = result.type === 'alimony';
  const themeClass = isAlimony ? 'border-blue-600 shadow-blue-900/10' : 'border-amber-600 shadow-amber-900/10';
  const textThemeClass = isAlimony ? 'text-blue-900' : 'text-amber-900';
  const accentThemeClass = isAlimony ? 'bg-blue-600' : 'bg-amber-600';
  const bgThemeClass = isAlimony ? 'bg-blue-50/50' : 'bg-amber-50/50';
  const borderThemeClass = isAlimony ? 'border-blue-100' : 'border-amber-100';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className={`bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border-t-8 ${themeClass}`}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-black text-gray-900 mb-2">
            {isAlimony ? 'Alimony Evaluation' : 'Economic Marriage Valuation'}
          </h2>
          <div className={`h-1 w-12 mx-auto rounded-full ${accentThemeClass} opacity-30`}></div>
        </div>
        
        <div className="flex flex-col items-center mb-12">
          <div className={`px-4 py-1.5 rounded-full ${bgThemeClass} ${borderThemeClass} border text-[10px] font-black uppercase tracking-[0.2em] ${textThemeClass} mb-4`}>
            {isAlimony ? 'Projected Monthly Support' : 'Estimated Profile Worth'}
          </div>
          <div className={`text-6xl md:text-7xl font-serif font-black tracking-tighter ${textThemeClass} flex items-baseline`}>
            <span className="text-3xl mr-2 opacity-50">₹</span>
            {result.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={result.breakdown}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {result.breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Valuation']} 
              />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {result.aiAnalysis && (
        <div className={`${bgThemeClass} p-10 md:p-12 rounded-[2.5rem] border ${borderThemeClass} shadow-inner relative overflow-hidden group`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-all duration-700"></div>
          
          <h3 className={`text-2xl font-serif font-black ${textThemeClass} mb-8 flex items-center`}>
            <span className="mr-3 bg-white p-2 rounded-xl shadow-sm">🧠</span> 
            Expert AI Counselor Insights
          </h3>
          
          <div className={`prose max-w-none ${isAlimony ? 'prose-blue' : 'prose-amber'} leading-relaxed`}>
            {result.aiAnalysis.split('\n\n').map((paragraph, i) => (
              <p key={i} className={`mb-6 text-lg font-medium ${isAlimony ? 'text-blue-900/80' : 'text-amber-900/80'}`}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className={`mt-8 pt-8 border-t ${borderThemeClass} flex items-center justify-between`}>
            <span className={`text-xs font-bold uppercase tracking-widest ${textThemeClass} opacity-40 italic`}>Analysis complete</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${accentThemeClass} opacity-20`}></div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
