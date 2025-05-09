
import { toast } from "sonner";
import { normalizeFeatures } from "./diabetes/categorization";
import { needsMedication } from "./diabetes/eligibility";
import { calculateMedicationScores } from "./diabetes/scoring";

// Main prediction function
export const predictMedications = async (patientData: any) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if patient meets criteria for medication
    if (!needsMedication(patientData)) {
      toast.info("No medications recommended", {
        description: "Based on the clinical criteria, this patient does not require diabetes medication at this time."
      });
      return [];
    }
    
    // Normalize and transform input features
    const normalizedFeatures = normalizeFeatures(patientData);
    
    // Generate recommendations with refined scoring
    const recommendations = calculateMedicationScores(normalizedFeatures, patientData);
    
    // If recommendations are empty even though patient meets criteria
    if (recommendations.length === 0) {
      toast.warning("Limited recommendations available", {
        description: "The patient may benefit from medication but current options have low suitability scores."
      });
    }
    
    // Sort by score descending
    return recommendations.sort((a, b) => b.score - a.score);
  } catch (error) {
    toast.error("Error generating recommendations");
    console.error("Prediction error:", error);
    return [];
  }
};
