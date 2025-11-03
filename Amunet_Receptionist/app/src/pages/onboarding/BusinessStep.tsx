import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { onboarding } from '@/services/api';
import toast from 'react-hot-toast';

const INDUSTRIES = [
  { value: 'retail', label: 'Retail' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'professional_services', label: 'Professional Services' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'other', label: 'Other' },
];

interface Props {
  data: any;
  onNext: (data: any) => void;
}

const BusinessStep: React.FC<Props> = ({ data, onNext }) => {
  const [name, setName] = useState(data.name || '');
  const [industry, setIndustry] = useState(data.industry || '');
  const [description, setDescription] = useState(data.description || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await onboarding.saveBusiness({ name, industry, description });
      const businessId = response.data.business.id;
      onNext({ name, industry, description, businessId });
    } catch (error) {
      toast.error('Failed to save business info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Tell us about your business</h2>
        <p className="text-gray-400">This helps us customize your experience</p>
      </div>

      <Input
        label="Business Name"
        placeholder="Acme Corporation"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Select
        label="Industry"
        options={INDUSTRIES}
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          What do you do?
        </label>
        <textarea
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
          rows={4}
          placeholder="Brief description of your business..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Continue
        </Button>
      </div>
    </form>
  );
};

export default BusinessStep;