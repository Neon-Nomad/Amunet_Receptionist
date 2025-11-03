import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  completed: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                index < currentStep
                  ? 'bg-primary border-primary text-white'
                  : index === currentStep
                  ? 'border-primary text-primary'
                  : 'border-dark-600 text-gray-500'
              }`}
            >
              {index < currentStep ? <Check size={20} /> : index + 1}
            </div>
            <span
              className={`mt-2 text-sm ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${
                index < currentStep ? 'bg-primary' : 'bg-dark-600'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};