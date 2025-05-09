
import { CLINICAL_THRESHOLDS } from './constants';

// Determine if patient needs medication based on clinical guidelines
export const needsMedication = (patientData: any) => {
  // Diabetes diagnosis criteria
  const hasElevatedA1c = patientData.a1c >= CLINICAL_THRESHOLDS.a1c.diabetes;
  const hasElevatedFBS = patientData.fbs >= CLINICAL_THRESHOLDS.fbs.diabetes;
  
  // Prediabetes with risk factors
  const hasPrediabetes = patientData.a1c >= CLINICAL_THRESHOLDS.a1c.prediabetes && 
                         patientData.a1c < CLINICAL_THRESHOLDS.a1c.diabetes;
  const hasElevatedPreFBS = patientData.fbs >= CLINICAL_THRESHOLDS.fbs.prediabetes && 
                           patientData.fbs < CLINICAL_THRESHOLDS.fbs.diabetes;
  const hasCardiovascularRisk = patientData.cvdRisk >= 15;
  const isObese = patientData.bmi >= CLINICAL_THRESHOLDS.bmi.obese;
  const isElderly = patientData.age >= 65;
  const hasRenalImpairment = patientData.renalFunction !== "normal";
  const hasLiverImpairment = patientData.liverFunction !== "normal";
  
  // Medication needed if:
  // 1. Has diabetes by A1c or FBS
  if (hasElevatedA1c || hasElevatedFBS) return true;
  
  // 2. Prediabetes with multiple risk factors
  if (hasPrediabetes || hasElevatedPreFBS) {
    // Count risk factors
    let riskFactorCount = 0;
    if (hasCardiovascularRisk) riskFactorCount++;
    if (isObese) riskFactorCount++;
    if (isElderly) riskFactorCount++;
    if (hasRenalImpairment) riskFactorCount++;
    if (hasLiverImpairment) riskFactorCount++;
    
    // Medication recommended if prediabetes with 2+ risk factors
    return riskFactorCount >= 2;
  }
  
  // No medication needed
  return false;
};
