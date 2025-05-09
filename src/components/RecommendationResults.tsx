
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface Medication {
  name: string;
  score: number;
  description: string;
  mechanism: string;
  sideEffects: string[];
  contraindications: string[];
  dosing: string;
  benefits: string[];
}

interface RecommendationResultsProps {
  recommendations: Medication[];
}

const RecommendationResults = ({ recommendations }: RecommendationResultsProps) => {
  if (!recommendations.length) return null;

  // Sort medications by score descending
  const sortedMeds = [...recommendations].sort((a, b) => b.score - a.score);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-medical-dark">Recommended Medications</h2>
      <p className="text-muted-foreground">
        Based on the patient profile, the following medications are recommended in order of suitability:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedMeds.map((med, index) => (
          <Card key={med.name} className={`border-l-4 ${index === 0 ? 'border-l-medical-success' : index < 3 ? 'border-l-medical-accent' : 'border-l-medical-neutral'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{med.name}</CardTitle>
                <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-medical-success" : ""}>
                  {(med.score * 100).toFixed(0)}% Match
                </Badge>
              </div>
              <CardDescription>{med.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="cautions">Cautions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-1 flex items-center">
                      <Info size={16} className="text-medical-primary mr-1" />
                      Mechanism
                    </h4>
                    <p className="text-sm">{med.mechanism}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1 flex items-center">
                      <Info size={16} className="text-medical-primary mr-1" />
                      Dosing
                    </h4>
                    <p className="text-sm">{med.dosing}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center">
                    <CheckCircle size={16} className="text-medical-success mr-1" />
                    Key Benefits
                  </h4>
                  <ul className="list-disc list-outside text-sm pl-5 space-y-1">
                    {med.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="cautions" className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-1 flex items-center">
                      <AlertTriangle size={16} className="text-medical-warning mr-1" />
                      Side Effects
                    </h4>
                    <ul className="list-disc list-outside text-sm pl-5 space-y-1">
                      {med.sideEffects.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1 flex items-center">
                      <AlertCircle size={16} className="text-medical-danger mr-1" />
                      Contraindications
                    </h4>
                    <ul className="list-disc list-outside text-sm pl-5 space-y-1">
                      {med.contraindications.map((contra, i) => (
                        <li key={i}>{contra}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Recommendation Strength</span>
                  <span className="font-semibold">{(med.score * 100).toFixed(0)}%</span>
                </div>
                <Progress value={med.score * 100} className={`h-1.5 ${index === 0 ? 'bg-medical-success/20' : 'bg-medical-neutral/50'}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-medical-neutral/30 rounded-md text-sm">
        <p className="font-semibold flex items-center">
          <Info size={16} className="text-medical-primary mr-2" />
          Disclaimer:
        </p>
        <p>These recommendations are generated using a machine learning model and should be reviewed by a healthcare professional. 
        Final medication decisions should be made in consultation with a doctor considering the patient's complete medical history.</p>
      </div>
    </div>
  );
};

export default RecommendationResults;
