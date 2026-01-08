
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
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        <p className="text-amber-800 font-medium animate-pulse">Running AI Socio-Economic Analysis...</p>
      </div>
    );
  }

  if (!result) return null;

  const isAlimony = result.type === 'alimony';
  const themeColor = isAlimony ? 'blue' : 'amber';
  const themeClass = isAlimony ? 'border-blue-600' : 'border-amber-600';
  const textThemeClass = isAlimony ? 'text-blue-900' : 'text-amber-900';
  const bgThemeClass = isAlimony ? 'bg-blue-50' : 'bg-amber-50';
  const borderThemeClass = isAlimony ? 'border-blue-100' : 'border-amber-100';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`bg-white p-8 rounded-2xl shadow-xl border-t-4 ${themeClass}`}>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">
          {isAlimony ? 'Alimony Estimate' : 'Dahej Summary'}
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <span className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">
            {isAlimony ? 'Monthly Estimate' : 'Total Profile Worth'}
          </span>
          <div className={`text-5xl md:text-6xl font-serif font-black ${textThemeClass}`}>
            ₹{result.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={result.breakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {result.breakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {result.aiAnalysis && (
        <div className={`${bgThemeClass} p-8 rounded-2xl border ${borderThemeClass} shadow-sm relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className={`w-24 h-24 ${isAlimony ? 'text-blue-600' : 'text-amber-600'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <h3 className={`text-xl font-serif font-bold ${textThemeClass} mb-4 flex items-center`}>
            <span className="mr-2">✨</span> AI {isAlimony ? 'Settlement' : 'Socio-Economic'} Analysis
          </h3>
          <div className={`prose max-w-none ${isAlimony ? 'prose-blue text-blue-900' : 'prose-amber text-amber-900'} leading-relaxed whitespace-pre-wrap`}>
            {result.aiAnalysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
