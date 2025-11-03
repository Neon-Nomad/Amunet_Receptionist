import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Settings, AlertCircle } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';

interface Integration {
  key: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
  mode: 'shared' | 'custom' | null;
}

const INTEGRATIONS: Integration[] = [
  { key: 'twilio', name: 'Twilio', description: 'Voice & SMS communication', icon: '📞', status: 'active', mode: 'shared' },
  { key: 'sendgrid', name: 'SendGrid', description: 'Email delivery & campaigns', icon: '✉️', status: 'active', mode: 'shared' },
  { key: 'stripe', name: 'Stripe', description: 'Payment processing', icon: '💳', status: 'active', mode: 'shared' },
  { key: 'meta', name: 'Meta Business', description: 'Instagram & Facebook posting', icon: '📱', status: 'inactive', mode: null },
  { key: 'google', name: 'Google Business', description: 'Google My Business posts', icon: '🔍', status: 'inactive', mode: null },
];

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [showModal, setShowModal] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState<Integration | null>(null);

  const handleConfigure = (integration: Integration) => {
    setCurrentIntegration(integration);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Integrations</h1>
        <p className="text-gray-400">Connect and manage your third-party services</p>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.key} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{integration.icon}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  integration.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {integration.status === 'active' ? (
                  <span className="flex items-center gap-1">
                    <Check size={12} />
                    Active
                  </span>
                ) : (
                  'Inactive'
                )}
              </div>
            </div>

            <h3 className="text-xl font-heading font-bold mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{integration.description}</p>

            {integration.mode && (
              <p className="text-xs text-primary mb-4">
                Using {integration.mode === 'shared' ? "Amunet's" : 'custom'} credentials
              </p>
            )}

            <Button
              variant={integration.status === 'active' ? 'secondary' : 'primary'}
              size="sm"
              className="w-full"
              onClick={() => handleConfigure(integration)}
            >
              <Settings size={16} />
              {integration.status === 'active' ? 'Manage' : 'Connect'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Info Banner */}
      <Card>
        <div className="flex gap-4">
          <AlertCircle className="text-primary flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold mb-1">Need custom integrations?</h3>
            <p className="text-sm text-gray-400">
              Contact your account manager to set up custom API connections or request new integrations.
            </p>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Configure ${currentIntegration?.name}`}
      >
        {currentIntegration && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">{currentIntegration.description}</p>

            {currentIntegration.status === 'active' ? (
              <>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    ✓ This integration is active and working properly
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Mode</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={currentIntegration.mode === 'shared' ? 'primary' : 'outline'}
                      size="sm"
                    >
                      Amunet's System
                    </Button>
                    <Button
                      variant={currentIntegration.mode === 'custom' ? 'primary' : 'outline'}
                      size="sm"
                    >
                      Custom Credentials
                    </Button>
                  </div>
                </div>

                <Button variant="secondary" className="w-full">
                  Disconnect
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400">
                  Connect your {currentIntegration.name} account to enable this integration.
                </p>
                <Button className="w-full">Connect {currentIntegration.name}</Button>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Integrations;