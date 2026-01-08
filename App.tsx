
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
    const homeVal = input.hasHome ? ASSET_WEIGHTS.HOME : 0;
    const carVal = input.hasCar ? ASSET_WEIGHTS.CAR : 0;

    const total = salaryVal + eduExpVal + maritalVal + locationVal + homeVal + carVal;

    const breakdown = [
      { name: 'Annualized Salary', value: salaryVal, color: '#92400e' },
      { name: 'Education Value', value: Math.round(eduExpVal), color: '#d97706' },
      { name: 'Demographic Factors', value: Math.max(0, maritalVal + locationVal), color: '#f59e0b' },
      { name: 'Asset Holdings', value: homeVal + carVal, color: '#fbbf24' },
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

    // Satirical Alimony Logic
    const incomeDiff = Math.max(0, input.yourMonthlySalary - input.spouseMonthlySalary);
    const maintenanceBase = incomeDiff * 0.25;
    const durationBonus = input.marriageDuration * 2000;
    const childrenBonus = input.numberOfChildren * 10000;
    const locationBonus = input.location.includes('Urban') ? 5000 : 0;

    const totalMonthly = maintenanceBase + durationBonus + childrenBonus + locationBonus;

    const breakdown = [
      { name: 'Income Differential', value: Math.round(maintenanceBase), color: '#1d4ed8' },
      { name: 'Duration Factor', value: durationBonus, color: '#3b82f6' },
      { name: 'Child Support Base', value: childrenBonus, color: '#60a5fa' },
      { name: 'Location Cost', value: locationBonus, color: '#93c5fd' },
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
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        <section className="bg-white border border-gray-100 p-2 rounded-2xl flex shadow-sm">
          <button 
            onClick={() => { setActiveTab('dahej'); setResult(null); }}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'dahej' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Dahej Calculator
          </button>
          <button 
            onClick={() => { setActiveTab('alimony'); setResult(null); }}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'alimony' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Alimony Calculator
          </button>
        </section>

        <section className={`${activeTab === 'alimony' ? 'bg-blue-50 border-blue-100 text-blue-900' : 'bg-amber-50 border-amber-100 text-amber-900'} border p-4 rounded-xl text-center text-sm shadow-sm transition-colors duration-300`}>
          <p>
            ✨ <strong>Just for fun!</strong> This website is for entertainment purposes only and does not promote dowry or separation.
          </p>
        </section>

        {activeTab === 'dahej' ? (
          <CalculatorForm onCalculate={calculateWorth} />
        ) : (
          <AlimonyForm onCalculate={calculateAlimony} />
        )}
        
        <div id="calculation-results">
          <ResultsDisplay result={result} loading={loading} />
        </div>

        <div className="pt-12">
          <BillPayerRandomizer />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
