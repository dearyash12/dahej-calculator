
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CalculatorForm from './components/CalculatorForm';
import AlimonyForm from './components/AlimonyForm';
import ResultsDisplay from './components/ResultsDisplay';
import BillPayerRandomizer from './components/BillPayerRandomizer';
import { ProfileInput, AlimonyInput, CalculationResult } from './types';
import { 
  EDUCATION_MULTIPLIERS, 
  MARITAL_STATUS_WEIGHTS, 
  LOCATION_WEIGHTS, 
  PROFESSION_WEIGHTS,
  ASSET_WEIGHTS, 
  BASE_SALARY_MULTIPLIER 
} from './constants';
import { getProfileAnalysis, getAlimonyAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dahej' | 'alimony'>('dahej');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateWorth = async (input: ProfileInput) => {
    setLoading(true);
    setResult(null);
    
    const salaryVal = input.monthlySalary * BASE_SALARY_MULTIPLIER;
    const eduExpVal = input.educationExpenses * EDUCATION_MULTIPLIERS[input.educationLevel];
    const maritalVal = MARITAL_STATUS_WEIGHTS[input.maritalStatus];
    const locationVal = LOCATION_WEIGHTS[input.location];
    const professionVal = PROFESSION_WEIGHTS[input.profession];
    const homeVal = input.hasHome ? ASSET_WEIGHTS.HOME : 0;
    const carVal = input.hasCar ? ASSET_WEIGHTS.CAR : 0;

    const total = salaryVal + eduExpVal + maritalVal + locationVal + professionVal + homeVal + carVal;

    const breakdown = [
      { name: 'Annual Salary Base', value: salaryVal, color: '#92400e' },
      { name: 'Education Premium', value: Math.round(eduExpVal), color: '#d97706' },
      { name: 'Profession Bonus', value: professionVal, color: '#b45309' },
      { name: 'Social Factors', value: Math.max(0, maritalVal + locationVal), color: '#f59e0b' },
      { name: 'Fixed Assets', value: homeVal + carVal, color: '#fbbf24' },
    ];

    const analysis = await getProfileAnalysis(input, total);

    setResult({
      totalValue: total,
      breakdown,
      aiAnalysis: analysis,
      type: 'dahej'
    });
    setLoading(false);
    scrollToBottom();
  };

  const calculateAlimony = async (input: AlimonyInput) => {
    setLoading(true);
    setResult(null);

    const incomeDiff = Math.max(0, input.yourMonthlySalary - input.spouseMonthlySalary);
    const maintenanceBase = incomeDiff * 0.25;
    const durationBonus = input.marriageDuration * 2000;
    const childrenBonus = input.numberOfChildren * 10000;
    const locationBonus = input.location.includes('Urban') ? 5000 : 0;

    const totalMonthly = maintenanceBase + durationBonus + childrenBonus + locationBonus;

    const breakdown = [
      { name: 'Income Split', value: Math.round(maintenanceBase), color: '#1e40af' },
      { name: 'Loyalty Factor', value: durationBonus, color: '#3b82f6' },
      { name: 'Caregiver Support', value: childrenBonus, color: '#60a5fa' },
      { name: 'Regional Adjust', value: locationBonus, color: '#93c5fd' },
    ];

    const analysis = await getAlimonyAnalysis(input, totalMonthly);

    setResult({
      totalValue: totalMonthly,
      breakdown,
      aiAnalysis: analysis,
      type: 'alimony'
    });
    setLoading(false);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const resultsElement = document.getElementById('calculation-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 mt-12 space-y-10">
        <section className="bg-white/80 backdrop-blur-sm border border-gray-100 p-1.5 rounded-2xl flex shadow-xl shadow-amber-900/5">
          <button 
            onClick={() => { setActiveTab('dahej'); setResult(null); }}
            className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'dahej' 
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-600/20' 
              : 'text-gray-500 hover:bg-amber-50 hover:text-amber-700'}`}
          >
            <span>⚖️</span>
            <span>Dahej Calculator</span>
          </button>
          <button 
            onClick={() => { setActiveTab('alimony'); setResult(null); }}
            className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'alimony' 
              ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'}`}
          >
            <span>💔</span>
            <span>Alimony Calculator</span>
          </button>
        </section>

        <section className={`transform transition-all duration-500 border p-5 rounded-2xl text-center text-sm font-medium shadow-sm ${
          activeTab === 'alimony' 
          ? 'bg-blue-50/50 border-blue-100 text-blue-800' 
          : 'bg-amber-50/50 border-amber-100 text-amber-800'
        }`}>
          <p className="flex items-center justify-center space-x-2">
            <span className="text-xl">✨</span>
            <span><strong>Disclaimer:</strong> This is a satirical tool for social commentary. It does not promote unethical practices.</span>
          </p>
        </section>

        <div className="transition-all duration-500 transform">
          {activeTab === 'dahej' ? (
            <CalculatorForm onCalculate={calculateWorth} />
          ) : (
            <AlimonyForm onCalculate={calculateAlimony} />
          )}
        </div>
        
        <div id="calculation-results" className="scroll-mt-24">
          <ResultsDisplay result={result} loading={loading} />
        </div>

        <div className="pt-8">
          <BillPayerRandomizer />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
