import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, DollarSign, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Card } from '@/components/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/format';

// Mock data - replace with API calls
const MOCK_STATS = {
  totalCalls: 247,
  callsThisMonth: 52,
  highPriorityLeads: 8,
  estimatedRevenue: 24500,
  conversionRate: 32,
  responseTime: 1.2,
};

const MOCK_CHART_DATA = [
  { name: 'Mon', calls: 12, revenue: 2400 },
  { name: 'Tue', calls: 19, revenue: 3800 },
  { name: 'Wed', calls: 15, revenue: 3200 },
  { name: 'Thu', calls: 22, revenue: 4100 },
  { name: 'Fri', calls: 28, revenue: 5600 },
  { name: 'Sat', calls: 8, revenue: 1800 },
  { name: 'Sun', calls: 6, revenue: 1200 },
];

const MOCK_RECENT_LEADS = [
  { id: 1, name: 'John Smith', phone: '+1 555 0123', intent: 'Purchase Inquiry', value: 2500, priority: 'HIGH', time: '10 min ago' },
  { id: 2, name: 'Sarah Johnson', phone: '+1 555 0456', intent: 'General Question', value: 500, priority: 'LOW', time: '2 hours ago' },
  { id: 3, name: 'Mike Davis', phone: '+1 555 0789', intent: 'Appointment Request', value: 1200, priority: 'HIGH', time: '5 hours ago' },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(MOCK_STATS);
  const [chartData, setChartData] = useState(MOCK_CHART_DATA);
  const [recentLeads, setRecentLeads] = useState(MOCK_RECENT_LEADS);

  const statCards = [
    { label: 'Total Calls', value: stats.totalCalls, icon: Phone, color: 'text-blue-400', change: '+12%' },
    { label: 'High Priority Leads', value: stats.highPriorityLeads, icon: AlertCircle, color: 'text-red-400', change: '+3' },
    { label: 'Est. Revenue', value: formatCurrency(stats.estimatedRevenue), icon: DollarSign, color: 'text-green-400', change: '+18%' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'text-primary', change: '+5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Your business intelligence at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-400 mt-2">{stat.change} this week</p>
                </div>
                <div className={`p-3 rounded-lg bg-dark-700 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calls Chart */}
        <Card>
          <h2 className="text-xl font-heading font-bold mb-4">Call Volume</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#23232F" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1A24', border: '1px solid #23232F', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="calls" stroke="#9D00FF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <h2 className="text-xl font-heading font-bold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#23232F" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1A24', border: '1px solid #23232F', borderRadius: '8px' }}
              />
              <Bar dataKey="revenue" fill="#9D00FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold">Recent Leads</h2>
          <a href="/leads" className="text-primary hover:underline text-sm">View All</a>
        </div>

        <div className="space-y-3">
          {recentLeads.map((lead) => (
            <motion.div
              key={lead.id}
              whileHover={{ x: 4 }}
              className="p-4 bg-dark-700 rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{lead.name}</h3>
                    {lead.priority === 'HIGH' && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">