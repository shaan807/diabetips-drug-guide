
import { CLINICAL_THRESHOLDS } from './constants';

// Input categorization functions
export const categorizeA1c = (value: number) => {
  if (value >= CLINICAL_THRESHOLDS.a1c.poorControl) return "high";
  if (value >= CLINICAL_THRESHOLDS.a1c.diabetes) return "medium";
  if (value >= CLINICAL_THRESHOLDS.a1c.prediabetes) return "low";
  return "normal";
};

export const categorizeAge = (value: number) => {
  if (value >= 65) return "elderly";
  if (value >= 35) return "middle";
  return "young";
};

export const categorizeBMI = (value: number) => {
  if (value >= 35) return "veryHigh";
  if (value >= CLINICAL_THRESHOLDS.bmi.obese) return "high";
  if (value >= CLINICAL_THRESHOLDS.bmi.normal) return "normal";
  return "low";
};

export const categorizeCVDRisk = (value: number) => {
  if (value >= 20) return "high";
  if (value >= 10) return "medium";
  return "low";
};

export const categorizeFBS = (value: number) => {
  if (value >= 200) return "veryHigh";
  if (value >= CLINICAL_THRESHOLDS.fbs.diabetes) return "high";
  if (value >= CLINICAL_THRESHOLDS.fbs.normal) return "elevated";
  return "normal";
};

// Normalize features to 0-1 scale
export const normalizeFeatures = (patientData: any) => {
  // Convert categorical features to numerical representation
  const a1cCategory = categorizeA1c(patientData.a1c);
  const ageCategory = categorizeAge(patientData.age);
  const bmiCategory = categorizeBMI(patientData.bmi);
  const cvdCategory = categorizeCVDRisk(patientData.cvdRisk);
  const fbsCategory = categorizeFBS(patientData.fbs);
  
  return {
    a1cCategory,
    fbsCategory,
    ageCategory,
    bmiCategory,
    cvdCategory,
    renalFunction: patientData.renalFunction,
    liverFunction: patientData.liverFunction,
    gender: patientData.gender,
  };
};
