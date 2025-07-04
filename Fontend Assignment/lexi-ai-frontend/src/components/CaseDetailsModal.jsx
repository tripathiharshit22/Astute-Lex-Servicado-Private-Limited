// components/CaseDetailsModal.jsx
import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

const CaseDetailsModal = ({ isOpen, onClose, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    caseType: 'Criminal',
    complainant: 'Seema Ratna, Mukesh Kumar',
    accused: 'Ajay Kumar, Raj Rani',
    victim: 'Neha Kumari',
    allegations: 'Dowry harassment, domestic violence, and abetment to suicide (304B, 498A, OP ACT)',
    factsSummary: 'Neha Kumari found hanging from ceiling fan, with evidence suggesting possible foul play amid dowry harassment allegations',
    dateOfIncident: '18.10.2022',
    representing: ['Neha Kumari']
  });

  const [selectedRepresenting, setSelectedRepresenting] = useState(['Neha Kumari']);

  const representingOptions = ['Neha Kumari', 'Ajay Kumar', 'Raj Rani'];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleRepresenting = (person) => {
    setSelectedRepresenting(prev => 
      prev.includes(person) 
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  const handleSave = () => {
    const newWorkspace = {
      ...formData,
      representing: selectedRepresenting,
      id: Date.now(),
      name: 'Johnson & Partners Merger',
      client: 'Johnson & Partners LLP',
      opponent: 'Chen Singh',
      case: 'Criminal',
      areaOfLaw: 'Abetment',
      timeline: 'First hearing done',
      status: 'Draft',
      avatars: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80',
        'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-1.2.1&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'
      ]
    };
    onSave(newWorkspace);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Case Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Case Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Type
            </label>
            <select
              value={formData.caseType}
              onChange={(e) => handleInputChange('caseType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Criminal">Criminal</option>
              <option value="Civil">Civil</option>
              <option value="Family">Family</option>
            </select>
          </div>

          {/* Complainant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complainant
            </label>
            <input
              type="text"
              value={formData.complainant}
              onChange={(e) => handleInputChange('complainant', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Accused */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accused
            </label>
            <input
              type="text"
              value={formData.accused}
              onChange={(e) => handleInputChange('accused', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Victim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Victim
            </label>
            <input
              type="text"
              value={formData.victim}
              onChange={(e) => handleInputChange('victim', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Allegations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allegations
            </label>
            <textarea
              value={formData.allegations}
              onChange={(e) => handleInputChange('allegations', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Facts Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facts Summary
            </label>
            <textarea
              value={formData.factsSummary}
              onChange={(e) => handleInputChange('factsSummary', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date of Incident */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Incident
            </label>
            <input
              type="text"
              value={formData.dateOfIncident}
              onChange={(e) => handleInputChange('dateOfIncident', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Representing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Representing (please select)*
            </label>
            <div className="flex flex-wrap gap-2">
              {representingOptions.map((person) => (
                <button
                  key={person}
                  onClick={() => toggleRepresenting(person)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedRepresenting.includes(person)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {person}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;