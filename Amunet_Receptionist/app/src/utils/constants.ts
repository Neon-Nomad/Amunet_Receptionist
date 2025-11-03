export const BRAND = {
  name: 'Amunet AI',
  color: '#9D00FF',
  logo: '/images/amunet_logo_master.png',
};

export const PLANS = {
  core: {
    name: 'Core',
    price: 997,
    features: [
      'AI Receptionist (24/7)',
      'SMS & Email Automation',
      'Basic Analytics',
      'Up to 500 calls/month',
      'Email Support',
    ],
  },
  growth: {
    name: 'Growth',
    price: 1997,
    features: [
      'Everything in Core',
      'Social Media Automation',
      'Newsletter Management',
      'Amunet Studio (AI Images)',
      'Up to 2,000 calls/month',
      'Priority Support',
      'Custom Branding',
    ],
  },
  elite: {
    name: 'Elite',
    price: null,
    features: [
      'Everything in Growth',
      'Amunet Motion (AI Videos)',
      'Dedicated Account Manager',
      'Unlimited Calls',
      'Custom Integrations',
      'White Label Options',
      '24/7 Phone Support',
    ],
  },
};

export const SERVICES = {
  receptionist: { name: 'AI Receptionist', icon: 'Phone' },
  sms: { name: 'SMS Automation', icon: 'MessageSquare' },
  social: { name: 'Social Media', icon: 'Share2' },
  newsletter: { name: 'Newsletters', icon: 'Mail' },
  studio: { name: 'Amunet Studio', icon: 'Image' },
  motion: { name: 'Amunet Motion', icon: 'Video' },
  roi: { name: 'ROI Analytics', icon: 'TrendingUp' },
};