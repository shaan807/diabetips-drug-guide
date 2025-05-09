
// Medication database with clinical properties
export const medicationDatabase = [
  {
    name: "Metformin",
    description: "First-line medication for Type 2 diabetes",
    mechanism: "Reduces hepatic glucose production and improves insulin sensitivity",
    sideEffects: ["Gastrointestinal discomfort", "Vitamin B12 deficiency", "Metallic taste"],
    contraindications: ["Severe renal impairment", "Metabolic acidosis", "Severe hypoxemia"],
    dosing: "Starting: 500mg once or twice daily; Max: 2000-2500mg daily in divided doses",
    benefits: ["Weight neutral or modest weight loss", "Low hypoglycemia risk", "Cardiovascular benefits", "Low cost"],
    // Clinical factor affinities (how suitable the medication is based on each factor)
    affinities: {
      a1c: { high: 0.9, medium: 0.95, low: 0.7 },
      renalFunction: { normal: 0.98, mild: 0.9, moderate: 0.6, severe: 0.2 },
      age: { young: 0.95, middle: 0.9, elderly: 0.8 },
      cvdRisk: { low: 0.9, medium: 0.85, high: 0.8 },
      liverFunction: { normal: 0.95, impaired: 0.7 },
      bmi: { low: 0.7, normal: 0.85, high: 0.95, veryHigh: 0.9 },
      gender: { male: 0.9, female: 0.9, other: 0.9 },
      fbs: { normal: 0.7, elevated: 0.8, high: 0.9, veryHigh: 0.95 }
    }
  },
  {
    name: "Sulfonylureas (e.g., Glipizide)",
    description: "Increases insulin secretion from the pancreas",
    mechanism: "Binds to ATP-sensitive K+ channels on pancreatic beta cells to stimulate insulin release",
    sideEffects: ["Hypoglycemia", "Weight gain", "Skin reactions"],
    contraindications: ["Severe hepatic impairment", "Allergy to sulfa drugs"],
    dosing: "Glipizide: Starting 5mg daily; Max: 20mg daily in divided doses",
    benefits: ["Rapid efficacy", "Good A1C reduction", "Low cost"],
    affinities: {
      a1c: { high: 0.95, medium: 0.9, low: 0.6 },
      renalFunction: { normal: 0.9, mild: 0.8, moderate: 0.7, severe: 0.4 },
      age: { young: 0.7, middle: 0.8, elderly: 0.5 },
      cvdRisk: { low: 0.8, medium: 0.7, high: 0.5 },
      liverFunction: { normal: 0.9, impaired: 0.3 },
      bmi: { low: 0.8, normal: 0.8, high: 0.7, veryHigh: 0.6 },
      gender: { male: 0.8, female: 0.8, other: 0.8 },
      fbs: { normal: 0.6, elevated: 0.7, high: 0.85, veryHigh: 0.9 }
    }
  },
  {
    name: "DPP-4 Inhibitors (e.g., Sitagliptin)",
    description: "Increases incretin levels to regulate glucose",
    mechanism: "Inhibits DPP-4 enzyme to increase GLP-1 and GIP hormones, enhancing insulin secretion and suppressing glucagon",
    sideEffects: ["Upper respiratory infection", "Nasopharyngitis", "Headache"],
    contraindications: ["History of pancreatitis", "Hypersensitivity"],
    dosing: "Sitagliptin: 100mg once daily; Adjust for renal impairment",
    benefits: ["Weight neutral", "Low hypoglycemia risk", "Once-daily dosing"],
    affinities: {
      a1c: { high: 0.7, medium: 0.85, low: 0.9 },
      renalFunction: { normal: 0.9, mild: 0.85, moderate: 0.8, severe: 0.7 },
      age: { young: 0.75, middle: 0.85, elderly: 0.9 },
      cvdRisk: { low: 0.85, medium: 0.8, high: 0.75 },
      liverFunction: { normal: 0.9, impaired: 0.8 },
      bmi: { low: 0.85, normal: 0.9, high: 0.8, veryHigh: 0.75 },
      gender: { male: 0.85, female: 0.85, other: 0.85 },
      fbs: { normal: 0.85, elevated: 0.85, high: 0.8, veryHigh: 0.75 }
    }
  },
  {
    name: "SGLT-2 Inhibitors (e.g., Empagliflozin)",
    description: "Reduces glucose reabsorption in the kidneys",
    mechanism: "Blocks SGLT-2 transporters in proximal tubule to increase urinary glucose excretion",
    sideEffects: ["Urinary tract infections", "Genital mycotic infections", "Volume depletion"],
    contraindications: ["End-stage renal disease", "Dialysis", "Diabetic ketoacidosis"],
    dosing: "Empagliflozin: 10mg once daily; Can increase to 25mg daily",
    benefits: ["Weight loss", "Blood pressure reduction", "Cardiovascular and renal benefits"],
    affinities: {
      a1c: { high: 0.8, medium: 0.9, low: 0.7 },
      renalFunction: { normal: 0.95, mild: 0.9, moderate: 0.7, severe: 0.3 },
      age: { young: 0.85, middle: 0.9, elderly: 0.7 },
      cvdRisk: { low: 0.8, medium: 0.9, high: 0.95 },
      liverFunction: { normal: 0.9, impaired: 0.85 },
      bmi: { low: 0.7, normal: 0.8, high: 0.95, veryHigh: 0.9 },
      gender: { male: 0.85, female: 0.8, other: 0.85 },
      fbs: { normal: 0.7, elevated: 0.8, high: 0.9, veryHigh: 0.95 }
    }
  },
  {
    name: "GLP-1 Receptor Agonists (e.g., Semaglutide)",
    description: "Mimics the action of incretin hormones",
    mechanism: "Activates GLP-1 receptors to increase insulin secretion, decrease glucagon, slow gastric emptying, and reduce appetite",
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Injection site reactions"],
    contraindications: ["Personal or family history of medullary thyroid carcinoma", "Multiple endocrine neoplasia syndrome type 2"],
    dosing: "Semaglutide: Starting 0.25mg SC weekly for 4 weeks, then 0.5mg; Can increase to 1mg weekly",
    benefits: ["Significant weight loss", "Cardiovascular benefits", "Once-weekly dosing (for some)"],
    affinities: {
      a1c: { high: 0.95, medium: 0.85, low: 0.7 },
      renalFunction: { normal: 0.9, mild: 0.85, moderate: 0.8, severe: 0.7 },
      age: { young: 0.85, middle: 0.9, elderly: 0.75 },
      cvdRisk: { low: 0.85, medium: 0.9, high: 0.95 },
      liverFunction: { normal: 0.9, impaired: 0.85 },
      bmi: { low: 0.6, normal: 0.7, high: 0.95, veryHigh: 0.98 },
      gender: { male: 0.85, female: 0.85, other: 0.85 },
      fbs: { normal: 0.7, elevated: 0.8, high: 0.9, veryHigh: 0.98 }
    }
  },
  {
    name: "Thiazolidinediones (e.g., Pioglitazone)",
    description: "Improves tissue sensitivity to insulin",
    mechanism: "Activates PPAR-gamma nuclear receptors to enhance insulin sensitivity in peripheral tissues",
    sideEffects: ["Weight gain", "Fluid retention", "Bone loss", "Heart failure exacerbation"],
    contraindications: ["Heart failure (NYHA Class III or IV)", "Active liver disease"],
    dosing: "Pioglitazone: Starting 15-30mg once daily; Max: 45mg daily",
    benefits: ["Durable glycemic control", "Potential cardiovascular benefits", "May preserve beta-cell function"],
    affinities: {
      a1c: { high: 0.85, medium: 0.9, low: 0.7 },
      renalFunction: { normal: 0.9, mild: 0.9, moderate: 0.9, severe: 0.8 },
      age: { young: 0.8, middle: 0.75, elderly: 0.6 },
      cvdRisk: { low: 0.8, medium: 0.7, high: 0.5 },
      liverFunction: { normal: 0.85, impaired: 0.3 },
      bmi: { low: 0.8, normal: 0.7, high: 0.6, veryHigh: 0.4 },
      gender: { male: 0.75, female: 0.7, other: 0.75 },
      fbs: { normal: 0.7, elevated: 0.75, high: 0.8, veryHigh: 0.85 }
    }
  },
  {
    name: "Insulin (Various Types)",
    description: "Replacement therapy for insulin deficiency",
    mechanism: "Exogenous insulin that binds to receptors to facilitate glucose uptake",
    sideEffects: ["Hypoglycemia", "Weight gain", "Injection site reactions", "Lipodystrophy"],
    contraindications: ["Hypersensitivity to specific insulin preparations"],
    dosing: "Highly individualized based on blood glucose, weight, and patient response",
    benefits: ["Most effective in lowering blood glucose", "No maximum dose", "Flexible regimens available"],
    affinities: {
      a1c: { high: 0.98, medium: 0.9, low: 0.7 },
      renalFunction: { normal: 0.95, mild: 0.95, moderate: 0.95, severe: 0.95 },
      age: { young: 0.9, middle: 0.85, elderly: 0.8 },
      cvdRisk: { low: 0.85, medium: 0.85, high: 0.85 },
      liverFunction: { normal: 0.95, impaired: 0.9 },
      bmi: { low: 0.85, normal: 0.85, high: 0.85, veryHigh: 0.85 },
      gender: { male: 0.9, female: 0.9, other: 0.9 },
      fbs: { normal: 0.7, elevated: 0.85, high: 0.95, veryHigh: 0.98 }
    }
  }
];
