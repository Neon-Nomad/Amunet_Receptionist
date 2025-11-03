import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { formatCurrency, formatDateTime, formatPhone } from '@/utils/format';
import api from '@/services/api';

interface Lead {
  id: string;
  from_number: string;
  transcript: string;
  status: string;
  priority: 'LOW' | 'HIGH';
  estimated_value: number;
  metadata: any;
  created_at: string;
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'ALL' | 'HIGH' | 'LOW'>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.from_number.includes(searchTerm) ||
          lead.transcript?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPriority !== 'ALL') {
      filtered = filtered.filter((lead) => lead.priority === filterPriority);
    }

    setFilteredLeads(filtered);
  }, [searchTerm, filterPriority, leads]);

  const fetchLeads = async () => {
    try {
      // Mock data - replace with actual API call
      const mockLeads: Lead[] = [
        {
          id: '1',
          from_number: '+15550123',
          transcript: "Hi, I'm interested in your premium package. Can you call me back to discuss pricing?",
          status: 'completed',
          priority: 'HIGH',
          estimated_value: 2500,
          metadata: { intent: 'purchase_inquiry', keywords: ['premium', 'pricing'] },
          created_at: new Date(Date.now() - 600000).toISOString(),
        },
        {
          id: '2',
          from_number: '+15550456',
          transcript: "What are your business hours?",
          status: 'completed',
          priority: 'LOW',
          estimated_value: 100,
          metadata: { intent: 'general_inquiry', keywords: ['hours'] },
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: '3',
          from_number: '+15550789',
          transcript: "I need to schedule a consultation for next week. This is urgent.",
          status: 'completed',
          priority: 'HIGH',
          estimated_value: 1200,
          metadata: { intent: 'appointment', keywords: ['consultation', 'urgent'] },
          created_at: new Date(Date.now() - 18000000).toISOString(),
        },
      ];

      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const priorityColor = (priority: string) => {
    return priority === 'HIGH' ? 'text-red-400 bg-red-500/20' : 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Leads</h1>
          <p className="text-gray-400">Manage and track your customer interactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterPriority === 'ALL' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterPriority('ALL')}
          >
            All
          </Button>
          <Button
            variant={filterPriority === 'HIGH' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterPriority('HIGH')}
          >
            High Priority
          </Button>
          <Button
            variant={filterPriority === 'LOW' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterPriority('LOW')}
          >
            Low Priority
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by phone number or transcript..."
            className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <Phone className="text-primary" size={24} />
            <div>
              <p className="text-2xl font-bold">{leads.length}</p>
              <p className="text-sm text-gray-400">Total Leads</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-red-400" size={24} />
            <div>
              <p className="text-2xl font-bold">{leads.filter((l) => l.priority === 'HIGH').length}</p>
              <p className="text-sm text-gray-400">High Priority</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Calendar className="text-green-400" size={24} />
            <div>
              <p className="text-2xl font-bold">{leads.filter((l) => new Date(l.created_at) > new Date(Date.now() - 86400000)).length}</p>
              <p className="text-sm text-gray-400">Today</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-400" size={24} />
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(leads.reduce((sum, l) => sum + l.estimated_value, 0))}
              </p>
              <p className="text-sm text-gray-400">Total Value</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leads List */}
      <Card>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <Phone size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No leads found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <motion.div
                key={lead.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedLead(lead)}
                className="p-4 bg-dark-700 rounded-lg cursor-pointer hover:bg-dark-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{formatPhone(lead.from_number)}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColor(lead.priority)}`}>
                        {lead.priority === 'HIGH' && '🔥 '}
                        {lead.priority}
                      </span>
                      {lead.metadata?.intent && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                          {lead.metadata.intent.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{lead.transcript}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDateTime(lead.created_at)}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold text-green-400">
                      {formatCurrency(lead.estimated_value)}
                    </p>
                    <p className="text-xs text-gray-500">Est. Value</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Lead Detail Modal */}
      <Modal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Lead Details"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">{formatPhone(selectedLead.from_number)}</h3>
                <p className="text-sm text-gray-400">{formatDateTime(selectedLead.created_at)}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${priorityColor(selectedLead.priority)}`}>
                {selectedLead.priority === 'HIGH' && '🔥 '}
                {selectedLead.priority} PRIORITY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Estimated Value</p>
                <p className="text-2xl font-bold text-green-400">
                  {formatCurrency(selectedLead.estimated_value)}
                </p>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Intent</p>
                <p className="text-lg font-semibold capitalize">
                  {selectedLead.metadata?.intent?.replace('_', ' ') || 'Unknown'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Transcript</h4>
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-gray-300">{selectedLead.transcript}</p>
              </div>
            </div>

            {selectedLead.metadata?.keywords && (
              <div>
                <h4 className="font-semibold mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.metadata.keywords.map((keyword: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone size={18} />
                Call Back
              </Button>
              <Button variant="secondary" className="flex-1">
                <MessageSquare size={18} />
                Send SMS
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Leads;