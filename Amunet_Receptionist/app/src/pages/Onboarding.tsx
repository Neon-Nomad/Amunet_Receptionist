import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProgressSteps } from '@/components/ProgressSteps';
import { Button } from '@/components/Button';
import { onboarding } from '@/services/api';
import toast, { Toaster } from 'react-hot-toast';

// Step components
import BusinessStep from './onboarding/BusinessStep';
import ContactStep from './onboarding/ContactStep';
import ServicesStep from './onboarding/ServicesStep';
import IntegrationsStep from './onboarding/IntegrationsStep';
import BrandingStep from './onboarding/BrandingStep';
import ReviewStep from './onboarding/ReviewStep';

const STEPS = [
  { label: 'Business', component: BusinessStep },
  { label: 'Contact', component: ContactStep },
  { label: 'Services', component: ServicesStep },
  { label: 'Integrations', component: IntegrationsStep },
  { label: 'Branding', component: BrandingStep },
  { label: 'Review', component: ReviewStep },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const CurrentStepComponent = STEPS[currentStep].component;

  const handleNext = async (stepData: any) => {
    const updatedData = { ...data, ...stepData };
    setData(updatedData);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setLoading(true);
      try {
        await onboarding.complete({ businessId: updatedData.businessId });
        toast.success('Onboarding complete! Welcome to Amunet AI 🎉');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to complete onboarding');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold mb-2">Setup Your Workspace</h1>
          <p className="text-gray-400 mb-8">Let's get your business automated in minutes</p>

          <ProgressSteps
            steps={STEPS.map((s, i) => ({ label: s.label, completed: i < currentStep }))}
            currentStep={currentStep}
          />

          <div className="bg-dark-800 border border-dark-600 rounded-xl p-8">
            <CurrentStepComponent
              data={data}
              onNext={handleNext}
              onBack={handleBack}
              loading={loading}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;