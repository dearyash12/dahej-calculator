
import { EducationLevel, LocationType, MaritalStatus } from './types';

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

export const ASSET_WEIGHTS = {
  HOME: 50000,
  CAR: 50000,
};

export const BASE_SALARY_MULTIPLIER = 12; // Annual salary base factor
