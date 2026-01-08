
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
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-blue-50 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Your Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.yourMonthlySalary}
            onChange={(e) => setFormData({ ...formData, yourMonthlySalary: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Spouse Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.spouseMonthlySalary}
            onChange={(e) => setFormData({ ...formData, spouseMonthlySalary: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Marriage Duration (Years)</label>
          <input
            type="number"
            value={formData.marriageDuration}
            onChange={(e) => setFormData({ ...formData, marriageDuration: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Number of Children</label>
          <input
            type="number"
            value={formData.numberOfChildren}
            onChange={(e) => setFormData({ ...formData, numberOfChildren: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">Location Context</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationType })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="India - Urban (Sehri)">India - Urban (Sehri)</option>
            <option value="India - Semi-Urban">India - Semi-Urban</option>
            <option value="India - Rural (Dehati)">India - Rural (Dehati)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-[0.98] transition-all text-lg"
      >
        Calculate Alimony
      </button>
    </form>
  );
};

export default AlimonyForm;
