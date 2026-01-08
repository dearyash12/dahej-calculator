
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
    
    // Playful delay for anticipation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-50 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-800">Who Pays Today?</h2>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Settling a bill with friends? Input their names and let fate decide who handles the check today!
      </p>

      <form onSubmit={addName} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          placeholder="Enter friend's name..."
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Add
        </button>
      </form>

      {names.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {names.map((name, index) => (
            <div
              key={index}
              className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 text-sm font-medium animate-in zoom-in duration-300"
            >
              {name}
              <button
                onClick={() => removeName(index)}
                className="ml-2 text-emerald-400 hover:text-emerald-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={pickWinner}
        disabled={names.length < 2 || isSpinning}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all transform active:scale-[0.98] ${
          names.length < 2 || isSpinning
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
        }`}
      >
        {isSpinning ? 'Choosing Victim...' : 'Pick a Payer'}
      </button>

      {winner && !isSpinning && (
        <div className="mt-8 p-6 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl text-center animate-in bounce-in duration-500">
          <p className="text-emerald-600 font-semibold uppercase tracking-widest text-xs mb-2">The Chosen One</p>
          <div className="text-3xl font-serif font-black text-emerald-900">
            💸 {winner} pays the bill!
          </div>
        </div>
      )}
    </section>
  );
};

export default BillPayerRandomizer;
