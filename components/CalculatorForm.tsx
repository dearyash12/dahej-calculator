
import React from 'react';
import { ProfileInput, EducationLevel, MaritalStatus, LocationType } from '../types';

interface Props {
  onCalculate: (data: ProfileInput) => void;
}

const CalculatorForm: React.FC<Props> = ({ onCalculate }) => {
  const [formData, setFormData] = React.useState<ProfileInput>({
    monthlySalary: 45000,
    educationLevel: 'Diploma',
    educationExpenses: 500000,
    maritalStatus: 'Single',
    hasHome: true,
    hasCar: true,
    location: 'India - Urban (Sehri)',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-amber-50 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Salary */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.monthlySalary}
            onChange={(e) => setFormData({ ...formData, monthlySalary: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            placeholder="e.g. 45000"
            required
          />
        </div>

        {/* Education Level */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Education Level</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as EducationLevel })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          >
            <option value="Schooling">Schooling</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate (Bachelors)</option>
            <option value="Postgraduate">Postgraduate (Masters)</option>
            <option value="PhD">PhD</option>
            <option value="Professional Certification">Professional (CA/CS/MD)</option>
          </select>
        </div>

        {/* Education Expenses */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Education Expenses (₹)</label>
          <input
            type="number"
            value={formData.educationExpenses}
            onChange={(e) => setFormData({ ...formData, educationExpenses: Number(e.target.value) })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            placeholder="e.g. 500000"
            required
          />
        </div>

        {/* Marital Status */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Marital Status</label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          >
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">Location Context</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationType })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          >
            <option value="India - Urban (Sehri)">India - Urban (Sehri)</option>
            <option value="India - Semi-Urban">India - Semi-Urban</option>
            <option value="India - Rural (Dehati)">India - Rural (Dehati)</option>
          </select>
        </div>

        {/* Assets */}
        <div className="flex items-center space-x-6 md:col-span-2 py-2">
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.hasHome}
              onChange={(e) => setFormData({ ...formData, hasHome: e.target.checked })}
              className="w-5 h-5 accent-amber-600 rounded mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Home Ownership</span>
          </label>
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.hasCar}
              onChange={(e) => setFormData({ ...formData, hasCar: e.target.checked })}
              className="w-5 h-5 accent-amber-600 rounded mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Car Ownership</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-[0.98] transition-all text-lg"
      >
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;
