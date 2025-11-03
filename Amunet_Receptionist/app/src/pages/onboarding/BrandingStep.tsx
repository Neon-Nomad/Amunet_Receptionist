import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { onboarding } from '@/services/api';
import toast from 'react-hot-toast';

const VOICE_STYLES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'calm', label: 'Calm' },
];

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const BrandingStep: React.FC<Props> = ({ data, onNext, onBack }) => {
  const [colorHex, setColorHex] = useState(data.colorHex || '#9D00FF');
  const [voiceStyle, setVoiceStyle] = useState(data.voiceStyle || 'professional');
  const [greetingScript, setGreetingScript] = useState(
    data.greetingScript || 'Thank you for calling! How can I help you today?'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onboarding.saveBranding({
        businessId: data.businessId,
        colorHex,
        voiceStyle,
        greetingScript,
      });
      onNext({ colorHex, voiceStyle, greetingScript });
    } catch (error) {
      toast.error('Failed to save branding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Brand & Voice</h2>
        <p className="text-gray-400">Customize how Amunet represents your business</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Brand Color
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            className="w-16 h-16 rounded cursor-pointer"
          />
          <Input
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            placeholder="#9D00FF"
          />
        </div>
      </div>

      <Select
        label="Voice Style"
        options={VOICE_STYLES}
        value={voiceStyle}
        onChange={(e) => setVoiceStyle(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Greeting Script
        </label>
        <textarea
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary transition-colors"
          rows={3}
          value={greetingScript}
          onChange={(e) => setGreetingScript(e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500">
          This is what AI says when answering calls
        </p>
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

export default BrandingStep;