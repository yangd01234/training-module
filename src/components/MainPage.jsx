import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UIButton, UIPanel } from './ui';

const MainPage = () => {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-full bg-gray-200 p-2 text-sm font-sans">
      <header className="bg-blue-800 text-white p-1 flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="mr-2">📊</span>
          <span className="font-bold">XLR 860ix Lithography Training System</span>
        </div>
      </header>

      <div className="bg-gray-100 border border-gray-400 p-1 rounded mb-4">
        <p>Please select the training module you wish to complete.</p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-4/5 flex space-x-4">
          <UIPanel className="w-1/2 p-2">
            <div className="text-center mb-3">
              <div className="text-lg font-bold">Maintainer Training</div>
              <div className="text-xs mb-2">For technical personnel responsible for system maintenance</div>
              <div className="w-16 h-16 bg-gray-300 border-2 border-gray-400 mx-auto mb-2 flex items-center justify-center">
                <div className="text-2xl">🔧</div>
              </div>
            </div>

            <div className="text-xs mb-4">
              <ul className="list-disc list-inside">
                <li>Safety protocols</li>
                <li>ArF gas system maintenance</li>
                <li>Calibration procedures</li>
              </ul>
            </div>

            <UIButton 
              className="w-full"
              onClick={() => setSelectedTraining('maintainer')}
              highlighted={selectedTraining === 'maintainer'}
            >
              Select Maintainer Training
            </UIButton>
          </UIPanel>

          <UIPanel className="w-1/2 p-2">
            <div className="text-center mb-3">
              <div className="text-lg font-bold">Operator Training</div>
              <div className="text-xs mb-2">For production personnel operating the lithography system</div>
              <div className="w-16 h-16 bg-gray-300 border-2 border-gray-400 mx-auto mb-2 flex items-center justify-center">
                <div className="text-2xl">👩‍💻</div>
              </div>
            </div>

            <div className="text-xs mb-4">
              <ul className="list-disc list-inside">
                <li>Basic safety awareness</li>
                <li>Wafer loading and unloading</li>
                <li>Quality control checks</li>
              </ul>
            </div>

            <UIButton 
              className="w-full"
              onClick={() => setSelectedTraining('operator')}
              highlighted={selectedTraining === 'operator'}
            >
              Select Operator Training
            </UIButton>
          </UIPanel>
        </div>
      </div>
      {selectedTraining && (
        <div className="flex justify-center">
          <UIButton 
            className="px-6 py-2"
            onClick={() => navigate(`/${selectedTraining}`)}
          >
            Start Training
          </UIButton>
        </div>
      )}
      <div className="mt-auto pt-4">
        <UIPanel className="p-1">
          <div className="text-xs text-gray-600 flex justify-between">
            <span>XLR 860ix Training System v3.2</span>
            <span>© 2025 Advanced Semiconductor Systems, Inc.</span>
          </div>
        </UIPanel>
      </div>
    </div>
  );
};

export default MainPage;
