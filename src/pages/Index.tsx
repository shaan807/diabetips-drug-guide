
import React, { useState } from 'react';
import Header from '@/components/Header';
import PatientForm from '@/components/PatientForm';
import RecommendationResults from '@/components/RecommendationResults';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Activity, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { predictMedications } from '@/lib/mlModel';
import { toast } from 'sonner';

// Type for patient data
interface PatientData {
  age: number;
  gender: string;
  a1c: number;
  fbs: number;
  weight: number;
  bmi: number;
  renalFunction: string;
  liverFunction: string;
  cvdRisk: number;
}

// Define the form data type to match what PatientForm component expects
type FormData = {
  age: number;
  gender: "male" | "female" | "other";
  a1c: number;
  fbs: number;
  weight: number;
  bmi: number;
  renalFunction: "normal" | "mild" | "moderate" | "severe";
  liverFunction: "normal" | "impaired";
  cvdRisk: number;
}

const Index = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [noMedications, setNoMedications] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    setShowResults(false);
    setNoMedications(false);
    
    toast.info("Analyzing patient data...", {
      description: "Our ML model is processing your request",
      icon: <Activity className="h-5 w-5" />,
    });

    try {
      const results = await predictMedications(data);
      setRecommendations(results);
      setShowResults(true);
      
      if (results.length === 0) {
        setNoMedications(true);
        toast.info("No medications recommended", {
          description: "This patient does not meet clinical criteria for diabetes medication",
        });
      } else {
        toast.success("Recommendations ready", {
          description: `${results.length} medications analyzed for this patient profile`,
        });
      }
    } catch (error) {
      toast.error("Error generating recommendations", {
        description: "Please try again or contact support",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-medical-dark mb-2">
            Diabetes Medication Recommender
          </h1>
          <p className="text-muted-foreground mb-6">
            Use machine learning to find the most suitable medications based on patient characteristics
          </p>
          
          <Alert variant="default" className="bg-medical-light border-medical-primary mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>About this tool</AlertTitle>
            <AlertDescription>
              This system uses a machine learning model to recommend diabetes medications based on patient characteristics. 
              The recommendations are sorted by predicted effectiveness for the specific patient profile. Please provide
              accurate information for the best results. Patients who don't meet clinical criteria for medication will
              not receive recommendations.
            </AlertDescription>
          </Alert>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
              <PatientForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>

          {loading && (
            <div className="flex justify-center my-12">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-medical-light rounded w-52 mb-2.5"></div>
                <div className="h-10 bg-medical-light rounded w-80"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-medical-light rounded col-span-1"></div>
                  <div className="h-20 bg-medical-light rounded col-span-1"></div>
                  <div className="h-20 bg-medical-light rounded col-span-1"></div>
                </div>
              </div>
            </div>
          )}
          
          {showResults && !loading && (
            <div className="mt-8">
              <Separator className="my-8" />
              {noMedications ? (
                <Alert variant="default" className="bg-gray-100 border-gray-300">
                  <InfoIcon className="h-4 w-4 text-gray-500" />
                  <AlertTitle>No Medications Recommended</AlertTitle>
                  <AlertDescription>
                    Based on the clinical guidelines and the provided patient data, no medications are recommended at this time. 
                    The patient may benefit from lifestyle modifications such as diet and exercise. Regular monitoring of A1C 
                    and blood glucose levels is advised.
                  </AlertDescription>
                </Alert>
              ) : (
                <RecommendationResults recommendations={recommendations} />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
