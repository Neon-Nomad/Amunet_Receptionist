import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Users, Video, Database, Activity } from 'lucide-react';

const Admin: React.FC = () => {
  const [soraCredits] = useState(87);
  const [totalUsers] = useState(234);
  const [activeSubscriptions] = useState(198);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">System overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <Users className="text-primary" size={32} />
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p className="text-sm text-gray-400">Total Users</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Activity className="text-green-400" size={32} />
            <div>
              <p className="text-2xl font-bold">{activeSubscriptions}</p>
              <p className="text-sm text-gray-400">Active Subs</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Video className="text-yellow-400" size={32} />
            <div>
              <p className="text-2xl font-bold">{soraCredits}</p>
              <p className="text-sm text-gray-400">Sora Credits</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Database className="text-blue-400" size={32} />
            <div>
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Admin Actions</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Impersonate User
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View System Logs
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Manage Sora Credits
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Database Backup
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Admin;