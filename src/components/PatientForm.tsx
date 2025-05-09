
import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  age: z.number().min(18, { message: 'Age must be at least 18' }).max(120, { message: 'Age must be less than 120' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender',
  }),
  a1c: z.number().min(4.0, { message: 'A1C must be at least 4.0%' }).max(15.0, { message: 'A1C must be less than 15.0%' }),
  fbs: z.number().min(70, { message: 'FBS must be at least 70 mg/dL' }).max(400, { message: 'FBS must be less than 400 mg/dL' }),
  weight: z.number().min(30, { message: 'Weight must be at least 30 kg' }).max(250, { message: 'Weight must be less than 250 kg' }),
  bmi: z.number().min(15, { message: 'BMI must be at least 15' }).max(50, { message: 'BMI must be less than 50' }),
  renalFunction: z.enum(['normal', 'mild', 'moderate', 'severe'], {
    required_error: 'Please select renal function status',
  }),
  liverFunction: z.enum(['normal', 'impaired'], {
    required_error: 'Please select liver function status',
  }),
  cvdRisk: z.number().min(0, { message: 'CVD risk must be at least 0%' }).max(100, { message: 'CVD risk must be at most 100%' }),
});

type FormData = z.infer<typeof formSchema>;

interface PatientFormProps {
  onSubmit: (data: FormData) => void;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 55,
      gender: 'male',
      a1c: 7.5,
      fbs: 140,
      weight: 80,
      bmi: 28,
      renalFunction: 'normal',
      liverFunction: 'normal',
      cvdRisk: 15,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Patient's age in years</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="a1c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HbA1c (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Glycated hemoglobin level</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fasting Blood Sugar (mg/dL)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bmi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BMI</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="renalFunction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Renal Function</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select renal function" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="mild">Mild Impairment</SelectItem>
                    <SelectItem value="moderate">Moderate Impairment</SelectItem>
                    <SelectItem value="severe">Severe Impairment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liverFunction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liver Function</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select liver function" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="impaired">Impaired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cvdRisk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardiovascular Disease Risk: {field.value}%</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(values) => field.onChange(values[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription>Estimated 10-year risk of CVD</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-medical-primary hover:bg-medical-dark"
        >
          Generate Medication Recommendations
        </Button>
      </form>
    </Form>
  );
};

export default PatientForm;
