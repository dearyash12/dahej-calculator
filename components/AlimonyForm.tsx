
import React from 'react';
import { AlimonyInput, LocationType } from '../types';

interface Props {
  onCalculate: (data: AlimonyInput) => void;
}

const AlimonyForm: React.FC<Props> = ({ onCalculate }) => {
  const [formData, setFormData] = React.useState<AlimonyInput>({
    yourMonthlySalary: 80000,
    spouseMonthlySalary: 30000,
    marriageDuration: 5,
    numberOfChildren: 1,
    location: 'India - Urban (Sehri)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-blue-50 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900/60 uppercase tracking-widest mb-2 px-1">Your Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.yourMonthlySalary}
            onChange={(e) => setFormData({ ...formData, yourMonthlySalary: Number(e.target.value) })}
            className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-blue-950"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900/60 uppercase tracking-widest mb-2 px-1">Spouse Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.spouseMonthlySalary}
            onChange={(e) => setFormData({ ...formData, spouseMonthlySalary: Number(e.target.value) })}
            className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-blue-950"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900/60 uppercase tracking-widest mb-2 px-1">Marriage Duration (Years)</label>
          <input
            type="number"
            value={formData.marriageDuration}
            onChange={(e) => setFormData({ ...formData, marriageDuration: Number(e.target.value) })}
            className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-blue-950"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900/60 uppercase tracking-widest mb-2 px-1">Number of Children</label>
          <input
            type="number"
            value={formData.numberOfChildren}
            onChange={(e) => setFormData({ ...formData, numberOfChildren: Number(e.target.value) })}
            className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-blue-950"
            required
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-xs font-bold text-blue-900/60 uppercase tracking-widest mb-2 px-1">Location Context</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationType })}
            className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-blue-950"
          >
            <option value="India - Urban (Sehri)">India - Urban (Sehri)</option>
            <option value="India - Semi-Urban">India - Semi-Urban</option>
            <option value="India - Rural (Dehati)">India - Rural (Dehati)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-br from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 transform active:scale-[0.97] transition-all text-xl uppercase tracking-widest"
      >
        Calculate Alimony
      </button>
    </form>
  );
};

export default AlimonyForm;
