// components/CreateWorkspaceModal.jsx
import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

const CreateWorkspaceModal = ({ isOpen, onClose, onNext }) => {
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'text'
  const [caseDescription, setCaseDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('File uploaded:', e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    // Simulate AI processing
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Case Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Upload the case files</h3>
            
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Drag and drop your document</span>
                <br />
                or click to browse files
              </p>
              <p className="text-sm text-gray-500">PDF (max 20 MB)</p>
            </div>
          </div>

          <div className="text-center">
            <span className="text-gray-500">or</span>
          </div>

          {/* Text Input */}
          <div>
            <h3 className="font-medium mb-3">Add case facts manually</h3>
            <textarea
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              placeholder="Enter case description"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full btn-primary"
          >
            Run AI Summariser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;