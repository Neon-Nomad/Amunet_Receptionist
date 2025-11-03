import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Share2, Mail, Image, Video, TrendingUp } from 'lucide-react';
import { Button } from '@/components/Button';
import { onboarding } from '@/services/api';
import toast from 'react-hot-toast';

const SERVICES = [
  { key: 'receptionist', label: 'AI Receptionist', icon: Phone, description: '24/7 call handling' },
  { key: 'sms', label: 'SMS Automation', icon: MessageSquare, description: 'Smart messaging' },
  { key: 'social', label: 'Social Media', icon: Share2, description: 'Auto-posting' },
  { key: 'newsletter', label: 'Newsletters', icon: Mail, description: 'Email campaigns' },
  { key: 'studio', label: 'Amunet Studio', icon: Image, description: 'AI images' },
  { key: 'motion', label: 'Amunet Motion', icon: Video, description: 'AI videos' },
  { key: 'roi', label: 'ROI Analytics', icon: TrendingUp, description: 'Track performance' },
];

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const ServicesStep: React.FC<Props> = ({ data, onNext, onBack }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    data.services || {
      receptionist: true,
      sms: true,
      social: false,
      newsletter: false,
      studio: false,
      motion: false,
      roi: true,
    }
  );
  const [loading, setLoading] = useState(false);

  const toggleService = (key: string) => {
    setSelected({ ...selected, [key]: !selected[key] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onboarding.saveServices({
        businessId: data.businessId,
        services: selected,
      });
      onNext({ services: selected });
    } catch (error) {
      toast.error('Failed to save services');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Choose Your Services</h2>
        <p className="text-gray-400">Select the tools you want to activate</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <motion.div
            key={service.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selected[service.key]
                ? 'border-primary bg-primary/10'
                : 'border-dark-600 hover:border-dark-500'
            }`}
            onClick={() => toggleService(service.key)}
          >
            <div className="flex items-start gap-3">
              <service.icon
                size={24}
                className={selected[service.key] ? 'text-primary' : 'text-gray-400'}
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{service.label}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
              </div>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selected[service.key] ? 'bg-primary border-primary' : 'border-dark-600'
                }`}
              >
                {selected[service.key] && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" loading={loading}>
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ServicesStep;