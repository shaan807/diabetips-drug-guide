
import { featureWeights } from './constants';
import { needsMedication } from './eligibility';
import { medicationDatabase } from './medications';

// Calculate medication scores with refined logic
export const calculateMedicationScores = (normalizedFeatures: any, patientData: any) => {
  // First check if medication is needed
  if (!needsMedication(patientData)) {
    return []; // Return empty array if no medication needed
  }
  
  return medicationDatabase.map(medication => {
    // Calculate score based on weighted feature affinities
    let score = 0;
    let totalWeight = 0;
    
    // A1C score (higher weight)
    const a1cWeight = featureWeights.a1c;
    score += a1cWeight * medication.affinities.a1c[normalizedFeatures.a1cCategory];
    totalWeight += a1cWeight;
    
    // FBS score (added)
    const fbsWeight = featureWeights.fbs;
    score += fbsWeight * medication.affinities.fbs[normalizedFeatures.fbsCategory];
    totalWeight += fbsWeight;
    
    // Renal function score
    const renalWeight = featureWeights.renalFunction;
    score += renalWeight * medication.affinities.renalFunction[normalizedFeatures.renalFunction];
    totalWeight += renalWeight;
    
    // Age score
    const ageWeight = featureWeights.age;
    score += ageWeight * medication.affinities.age[normalizedFeatures.ageCategory];
    totalWeight += ageWeight;
    
    // CVD risk score
    const cvdWeight = featureWeights.cvdRisk;
    score += cvdWeight * medication.affinities.cvdRisk[normalizedFeatures.cvdCategory];
    totalWeight += cvdWeight;
    
    // Liver function score
    const liverWeight = featureWeights.liverFunction;
    score += liverWeight * medication.affinities.liverFunction[normalizedFeatures.liverFunction];
    totalWeight += liverWeight;
    
    // BMI score
    const bmiWeight = featureWeights.bmi;
    score += bmiWeight * medication.affinities.bmi[normalizedFeatures.bmiCategory];
    totalWeight += bmiWeight;
    
    // Gender (less significant weight)
    score += 0.02 * medication.affinities.gender[normalizedFeatures.gender];
    totalWeight += 0.02;
    
    // Normalize score to 0-1 range
    const normalizedScore = score / totalWeight;
    
    // Apply clinical adjustments
    let adjustedScore = normalizedScore;
    
    // Adjust for severe renal impairment
    if (normalizedFeatures.renalFunction === "severe") {
      // Reduce score for medications contraindicated in severe renal disease
      if (medication.name.includes("Metformin") || medication.name.includes("SGLT-2")) {
        adjustedScore *= 0.3;
      }
    }
    
    // Adjust for liver impairment
    if (normalizedFeatures.liverFunction === "impaired") {
      // Reduce score for medications contraindicated in liver disease
      if (medication.name.includes("Pioglitazone") || medication.name.includes("Sulfonylureas")) {
        adjustedScore *= 0.4;
      }
    }
    
    // Adjust for high cardiovascular risk
    if (normalizedFeatures.cvdCategory === "high") {
      // Boost score for medications with cardiovascular benefits
      if (medication.name.includes("SGLT-2") || medication.name.includes("GLP-1")) {
        adjustedScore *= 1.3;
      }
    }
    
    // Adjust for very high BMI
    if (normalizedFeatures.bmiCategory === "veryHigh") {
      // Boost score for medications that support weight loss
      if (medication.name.includes("GLP-1") || medication.name.includes("SGLT-2")) {
        adjustedScore *= 1.25;
      }
      // Reduce score for medications that cause weight gain
      if (medication.name.includes("Sulfonylureas") || medication.name.includes("Insulin")) {
        adjustedScore *= 0.7;
      }
    }
    
    return {
      ...medication,
      score: adjustedScore
    };
  }).filter(med => med.score > 0.5); // Only return medications with reasonable match scores
};
