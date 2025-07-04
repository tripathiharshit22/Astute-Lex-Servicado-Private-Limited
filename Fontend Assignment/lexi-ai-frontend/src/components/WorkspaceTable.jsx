// components/WorkspaceTable.jsx
import React from 'react';
import { MoreHorizontal, Grid, List } from 'lucide-react';

const WorkspaceTable = ({ workspaces, viewMode, onViewModeChange, onCreateWorkspace }) => {
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <div key={workspace.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
              <p className="text-sm text-gray-600">{workspace.client}</p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                workspace.status === 'Draft' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {workspace.status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Case:</span>
              <span className="text-gray-900">{workspace.case}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {workspace.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Team member"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Open →
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Workspace Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Opponent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Case
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Area of Law
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timeline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workspaces.map((workspace) => (
            <tr key={workspace.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{workspace.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{workspace.client}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{workspace.opponent}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{workspace.case}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{workspace.areaOfLaw}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{workspace.timeline}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header with filters and view toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Criminal</option>
            <option>Civil</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Draft</option>
            <option>Review</option>
          </select>
          <button 
            onClick={onCreateWorkspace}
            className="btn-primary"
          >
            + Create New Workspace
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default WorkspaceTable;