
// Clinical thresholds for medication recommendation
export const CLINICAL_THRESHOLDS = {
  a1c: {
    normal: 5.6, // Below this is normal
    prediabetes: 6.4, // Between normal and this is prediabetes
    diabetes: 6.5, // Above this is diabetes requiring medication
    poorControl: 8.0 // Above this is poorly controlled diabetes
  },
  fbs: {
    normal: 100, // Below this is normal (mg/dL)
    prediabetes: 125, // Between normal and this is prediabetes
    diabetes: 126 // Above this is diabetes
  },
  bmi: {
    normal: 25, // Below this is normal or underweight
    overweight: 30, // Between normal and this is overweight
    obese: 30 // Above this is obese
  }
};

// Refined feature importance weights based on clinical guidelines
export const featureWeights = {
  a1c: 0.30, // Increased weight for A1C as primary diagnostic
  fbs: 0.15, // Increased weight for fasting blood sugar
  renalFunction: 0.15,
  age: 0.10,
  cvdRisk: 0.15,
  liverFunction: 0.10,
  bmi: 0.05,
  weight: 0.00, // Weight considered via BMI already
};
