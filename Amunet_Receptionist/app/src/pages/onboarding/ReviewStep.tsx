import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
  loading?: boolean;
}

const ReviewStep: React.FC<Props> = ({ data, onNext, onBack, loading }) => {
  const handleLaunch = () => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Ready to Launch!</h2>
        <p className="text-gray-400">Review your setup and start automating</p>
      </div>

      <div className="bg-dark-700 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Business</h3>
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-400">{data.industry}</p>
        </div>

        <div className="border-t border-dark-600 pt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Active Services</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.services || {})
              .filter(([_, enabled]) => enabled)
              .map(([service]) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full flex items-center gap-1"
                >
                  <Check size={14} />
                  {service}
                </span>
              ))}
          </div>
        </div>

        <div className="border-t border-dark-600 pt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Contact</h3>
          <p className="text-sm">{data.phone}</p>
          <p className="text-sm">{data.email}</p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
        <h3 className="font-semibold text-primary mb-2">What happens next?</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Demo data will be seeded to your account</span>
          </li>
          <li className="flex gap-2">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Your AI receptionist will be activated</span>
          </li>
          <li className="flex gap-2">
            <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>You can start creating content immediately</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleLaunch} loading={loading}>
          🚀 Launch My Workspace
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;