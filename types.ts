
export type EducationLevel = 'Schooling' | 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'PhD' | 'Professional Certification';
export type MaritalStatus = 'Single' | 'Divorced' | 'Widowed';
export type LocationType = 'India - Urban (Sehri)' | 'India - Semi-Urban' | 'India - Rural (Dehati)';
export type Profession = 'Doctor' | 'Engineer' | 'IAS/IPS Officer' | 'Government Job' | 'Software Engineer' | 'Teacher' | 'Lawyer' | 'Businessman' | 'Artist' | 'Other Professional' | 'Unemployed';

export interface ProfileInput {
  monthlySalary: number;
  educationLevel: EducationLevel;
  educationExpenses: number;
  maritalStatus: MaritalStatus;
  hasHome: boolean;
  hasCar: boolean;
  location: LocationType;
  profession: Profession;
}

export interface AlimonyInput {
  yourMonthlySalary: number;
  spouseMonthlySalary: number;
  marriageDuration: number;
  numberOfChildren: number;
  location: LocationType;
}

export interface CalculationResult {
  totalValue: number;
  breakdown: {
    name: string;
    value: number;
    color: string;
  }[];
  aiAnalysis?: string;
  type: 'dahej' | 'alimony';
}