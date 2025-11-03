import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { onboarding } from '@/services/api';
import toast from 'react-hot-toast';
import { Check, Settings } from 'lucide-react';

const INTEGRATIONS = [
  { key: 'twilio', name: 'Twilio', description: 'Voice & SMS' },
  { key: 'sendgrid', name: 'SendGrid', description: 'Email delivery' },
  { key: 'stripe', name: 'Stripe', description: 'Payments' },
];

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const IntegrationsStep: React.FC<Props> = ({ data, onNext, onBack }) => {
  const [mode, setMode] = useState<Record<string, 'shared' | 'custom'>>({});
  const [showModal, setShowModal] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState('');
  const [credentials, setCredentials] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSelectMode = async (integration: string, selectedMode: 'shared' | 'custom') => {
    if (selectedMode === 'shared') {
      try {
        await onboarding.saveIntegration({
          businessId: data.businessId,
          service: integration,
          mode: 'shared',
        });
        setMode({ ...mode, [integration]: 'shared' });
        toast.success(`${integration} configured with Amunet's system`);
      } catch (error) {
        toast.error('Failed to save integration');
      }
    } else {
      setCurrentIntegration(integration);
      setShowModal(true);
    }
  };

  const handleSaveCustom = async () => {
    setLoading(true);
    try {
      await onboarding.saveIntegration({
        businessId: data.businessId,
        service: currentIntegration,
        mode: 'custom',
        credentials: credentials[currentIntegration],
      });
      setMode({ ...mode, [currentIntegration]: 'custom' });
      setShowModal(false);
      toast.success('Custom credentials saved');
    } catch (error) {
      toast.error('Failed to save credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    onNext({ integrations: mode });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-2">Connect Your Tools</h2>
        <p className="text-gray-400">Use our infrastructure or bring your own</p>
      </div>

      <div className="space-y-4">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.key}
            className="p-4 border border-dark-600 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{integration.name}</h3>
                <p className="text-sm text-gray-400">{integration.description}</p>
              </div>
              {mode[integration.key] && (
                <Check className="text-primary" size={20} />
              )}
            </div>

            {!mode[integration.key] ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => handleSelectMode(integration.key, 'shared')}
                >
                  Use Amunet's (Recommended)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectMode(integration.key, 'custom')}
                >
                  <Settings size={16} />
                  Use My Own
                </Button>
              </div>
            ) : (
              <p className="text-sm text-primary">
                ✓ Configured with {mode[integration.key]} credentials
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Configure ${currentIntegration}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Enter your own API credentials. They will be encrypted and stored securely.
          </p>
          
          <Input
            label="API Key"
            placeholder="Enter your API key"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                [currentIntegration]: { apiKey: e.target.value },
              })
            }
          />

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustom} loading={loading}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default IntegrationsStep;