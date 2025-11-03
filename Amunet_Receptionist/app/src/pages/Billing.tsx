import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, ExternalLink, Check } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PLANS } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/format';

const Billing: React.FC = () => {
  const [currentPlan] = useState('growth');
  const [billingInfo] = useState({
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    amount: 1997,
    status: 'active',
    paymentMethod: '**** **** **** 4242',
  });

  const [invoices] = useState([
    { id: 'INV-001', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), amount: 1997, status: 'paid' },
    { id: 'INV-002', date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), amount: 1997, status: 'paid' },
    { id: 'INV-003', date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), amount: 1997, status: 'paid' },
  ]);

  const openBillingPortal = () => {
    // In production, call Stripe billing portal API
    window.open('https://billing.stripe.com/p/session/test_mock', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Billing</h1>
        <p className="text-gray-400">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-bold mb-2">
              {PLANS[currentPlan as keyof typeof PLANS].name} Plan
            </h2>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(PLANS[currentPlan as keyof typeof PLANS].price)}/mo
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Next billing: {formatDate(billingInfo.nextBilling)}
            </p>
          </div>
          <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
            ● Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-dark-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Payment Method</p>
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-primary" />
              <p className="font-semibold">{billingInfo.paymentMethod}</p>
            </div>
          </div>
          <div className="p-4 bg-dark-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(billingInfo.amount)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={openBillingPortal}>
            <ExternalLink size={18} />
            Manage Subscription
          </Button>
          <Button variant="outline">Change Plan</Button>
        </div>
      </Card>

      {/* Plan Features */}
      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Your Plan Includes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLANS[currentPlan as keyof typeof PLANS].features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="text-primary flex-shrink-0 mt-0.5" size={18} />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Invoices */}
      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Invoice History</h2>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 bg-dark-700 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-semibold">{invoice.id}</p>
                <p className="text-sm text-gray-400">{formatDate(invoice.date)}</p>
              </div>
              <div className="text-right mr-4">
                <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                <p className="text-sm text-green-400">Paid</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Billing;