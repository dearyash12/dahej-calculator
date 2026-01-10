
import { EducationLevel, LocationType, MaritalStatus, Profession } from './types';

export const EDUCATION_MULTIPLIERS: Record<EducationLevel, number> = {
  'Schooling': 0.8,
  'Diploma': 1.1,
  'Undergraduate': 1.3,
  'Postgraduate': 1.6,
  'PhD': 2.0,
  'Professional Certification': 1.5,
};

export const MARITAL_STATUS_WEIGHTS: Record<MaritalStatus, number> = {
  'Single': 50000,
  'Divorced': -50000,
  'Widowed': 0,
};

export const LOCATION_WEIGHTS: Record<LocationType, number> = {
  'India - Urban (Sehri)': 50000,
  'India - Semi-Urban': 25000,
  'India - Rural (Dehati)': 0,
};

export const PROFESSION_WEIGHTS: Record<Profession, number> = {
  'Doctor': 150000,
  'Engineer': 100000,
  'IAS/IPS Officer': 300000,
  'Government Job': 250000,
  'Software Engineer': 120000,
  'Teacher': 60000,
  'Lawyer': 80000,
  'Businessman': 200000,
  'Artist': 40000,
  'Other Professional': 50000,
  'Unemployed': -100000,
};

export const ASSET_WEIGHTS = {
  HOME: 50000,
  CAR: 50000,
};

export const BASE_SALARY_MULTIPLIER = 12; // Annual salary base factor