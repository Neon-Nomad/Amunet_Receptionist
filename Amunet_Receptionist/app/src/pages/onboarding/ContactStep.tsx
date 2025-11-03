import React, { useState } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { onboarding } from '@/services/api';
import toast from 'react-hot-toast';

const TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
  { value: 'America/Denver', label: 'Mountain Time' },
  { value: 'America/Chicago', label: 'Central Time' },
  { value: 'America/New_York', label: 'Eastern Time' },
];

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const ContactStep: React.FC<Props> = ({ data, onNext, onBack }) => {
  const [phone, setPhone] = useState(data.phone || '');
  const [email, setEmail] = useState(data.email || '');
  const [timezone, setTimezone] = useState(data.timezone || 'America/Los_Angeles');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onboarding.saveContact({
        businessId: data.businessId,
        phone,
        email,
        timezone,
        hours: { mon: '9-5', tue: '9-5', wed: '9-5', thu: '9-5', fri: '9-5' },
      });
      onNext({ phone, email, timezone });
    } catch (error) {
      toast.error('Failed to save contact info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Contact Information</h2>
        <p className="text-gray-400">How can customers reach you?</p>
      </div>

      <Input
        label="Business Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <Input
        label="Business Email"
        type="email"
        placeholder="contact@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Select
        label="Timezone"
        options={TIMEZONES}
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      />

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

export default ContactStep;