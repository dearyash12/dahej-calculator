
import React, { useState } from 'react';

const BillPayerRandomizer: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addName = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentName.trim() && !names.includes(currentName.trim())) {
      setNames([...names, currentName.trim()]);
      setCurrentName('');
      setWinner(null);
    }
  };

  const removeName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
    setWinner(null);
  };

  const pickWinner = () => {
    if (names.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-emerald-50 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg shadow-emerald-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-black text-gray-900">The Bill Payer roulette</h2>
            <div className="h-1 w-10 bg-emerald-500/30 rounded-full"></div>
          </div>
        </div>

        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          Dining out with friends? End the awkwardness. Add names and let fate choose the lucky individual to handle the check.
        </p>

        <form onSubmit={addName} className="flex space-x-3 mb-8">
          <input
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="Who is at the table?"
            className="flex-1 p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-emerald-950"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-2xl font-black transition-all shadow-lg shadow-emerald-200"
          >
            Add
          </button>
        </form>

        {names.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            {names.map((name, index) => (
              <div
                key={index}
                className="flex items-center bg-white text-emerald-700 px-5 py-2.5 rounded-2xl border border-emerald-100 text-sm font-bold shadow-sm hover:shadow-md transition-all animate-in zoom-in duration-300"
              >
                {name}
                <button
                  onClick={() => removeName(index)}
                  className="ml-3 text-emerald-300 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={pickWinner}
          disabled={names.length < 2 || isSpinning}
          className={`w-full py-5 rounded-[1.5rem] font-black text-xl shadow-xl transition-all transform active:scale-[0.97] uppercase tracking-widest ${
            names.length < 2 || isSpinning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white hover:from-emerald-600 hover:to-teal-800 shadow-emerald-600/20'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Randomizing...
            </span>
          ) : 'Decide Payer'}
        </button>

        {winner && !isSpinning && (
          <div className="mt-10 p-10 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-200 rounded-[2.5rem] text-center animate-in bounce-in duration-700">
            <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">The Chosen Sacrifice</p>
            <div className="text-4xl md:text-5xl font-serif font-black text-emerald-900 mb-2">
              🎉 {winner}
            </div>
            <p className="text-emerald-700 font-bold">is picking up the check!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BillPayerRandomizer;
