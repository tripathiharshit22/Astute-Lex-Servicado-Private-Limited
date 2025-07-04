// / pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardCard from '../components/DashboardCard';
import WorkspaceTable from '../components/WorkspaceTable';
import CreateWorkspaceModal from '../components/CreateWorkspaceModal';
import CaseDetailsModal from '../components/CaseDetailsModal';
import { FileText, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('litigation');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCaseDetailsModal, setShowCaseDetailsModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Johnson & Partners Merger',
      client: 'Johnson & Partners LLP',
      opponent: 'Chen Singh',
      case: 'Criminal',
      areaOfLaw: 'Abetment',
      timeline: 'First hearing done',
      status: 'Current',
      avatars: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80',
    //     'https://unsplash.com/photos/smiling-woman-wearing-white-and-black-pinstriped-collared-top-QXevDflbl8A'
      ]
    }
  ]);

  const dashboardStats = [
    {
      title: 'Total Workspaces',
      value: '4',
      change: '+2% from last month',
      changeType: 'positive',
      icon: FileText
    },
    {
      title: 'Total Signed Contracts',
      value: '51',
      change: '+12% from last month',
      changeType: 'positive',
      icon: CheckCircle
    },
    {
      title: 'Contracts Drafted',
      value: '4',
      change: '-4% from last month',
      changeType: 'negative',
      icon: AlertTriangle
    },
    {
      title: 'Contracts Reviewed',
      value: '18',
      change: '+3% from last month',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Contracts Translated',
      value: '9',
      change: '+5% from last month',
      changeType: 'positive',
      icon: XCircle
    }
  ];

  const handleCreateWorkspace = () => {
    setShowCreateModal(true);
  };

  const handleModalNext = () => {
    setShowCreateModal(false);
    setShowCaseDetailsModal(true);
  };

  const handleModalBack = () => {
    setShowCaseDetailsModal(false);
    setShowCreateModal(true);
  };

  const handleSaveWorkspace = (newWorkspace) => {
    setWorkspaces(prev => [...prev, newWorkspace]);
    setShowCaseDetailsModal(false);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowCaseDetailsModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <DashboardCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Workspaces Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Workspaces</h2>
              
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('contracts')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'contracts'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Contracts
                </button>
                <button
                  onClick={() => setActiveTab('litigation')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'litigation'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Litigation
                </button>
              </div>
            </div>

            {/* Workspace Content */}
            <WorkspaceTable
              workspaces={workspaces}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onCreateWorkspace={handleCreateWorkspace}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isOpen={showCreateModal}
        onClose={handleCloseModals}
        onNext={handleModalNext}
      />
      
      <CaseDetailsModal
        isOpen={showCaseDetailsModal}
        onClose={handleCloseModals}
        onBack={handleModalBack}
        onSave={handleSaveWorkspace}
      />
    </div>
  );
};

export default Dashboard;