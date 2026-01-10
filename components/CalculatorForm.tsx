
import React from 'react';
import { ProfileInput, EducationLevel, MaritalStatus, LocationType, Profession } from '../types';

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
    profession: 'Software Engineer',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-amber-50 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Monthly Salary (₹)</label>
          <input
            type="number"
            value={formData.monthlySalary}
            onChange={(e) => setFormData({ ...formData, monthlySalary: Number(e.target.value) })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Profession</label>
          <select
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value as Profession })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950 appearance-none"
          >
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="IAS/IPS Officer">IAS/IPS Officer</option>
            <option value="Government Job">Government Job</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Teacher">Teacher</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Businessman">Businessman</option>
            <option value="Artist">Artist</option>
            <option value="Other Professional">Other Professional</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Education Level</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as EducationLevel })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950 appearance-none"
          >
            <option value="Schooling">Schooling</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate (Bachelors)</option>
            <option value="Postgraduate">Postgraduate (Masters)</option>
            <option value="PhD">PhD</option>
            <option value="Professional Certification">Professional (CA/CS/MD)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Education Expenses (₹)</label>
          <input
            type="number"
            value={formData.educationExpenses}
            onChange={(e) => setFormData({ ...formData, educationExpenses: Number(e.target.value) })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Marital Status</label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950"
          >
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-2 px-1">Location Context</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationType })}
            className="p-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-950"
          >
            <option value="India - Urban (Sehri)">India - Urban (Sehri)</option>
            <option value="India - Semi-Urban">India - Semi-Urban</option>
            <option value="India - Rural (Dehati)">India - Rural (Dehati)</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-10 md:col-span-2 py-4 px-2">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.hasHome}
                onChange={(e) => setFormData({ ...formData, hasHome: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${formData.hasHome ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.hasHome ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <span className="ml-3 text-sm font-bold text-amber-900/70 group-hover:text-amber-950 transition-colors">Home Ownership</span>
          </label>

          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.hasCar}
                onChange={(e) => setFormData({ ...formData, hasCar: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${formData.hasCar ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.hasCar ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <span className="ml-3 text-sm font-bold text-amber-900/70 group-hover:text-amber-950 transition-colors">Car Ownership</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-amber-900/20 transform active:scale-[0.97] transition-all text-xl uppercase tracking-widest"
      >
        Calculate Value
      </button>
    </form>
  );
};

export default CalculatorForm;