import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UIButton, UIPanel, UIWindow } from './ui';

const OperatorUI = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [ui, setUI] = useState({
    console: 'built-in',
    calType: null,
    uploaded: false,
    calibrating: false,
    progress: 0,
    calStatus: {wave: false, beam: false, align: false}
  });

  const pulseCount = 39850000000;

  const nextStep = () => setStep(s => s < 6 ? s + 1 : s);

  const runCal = () => {
    setUI({...ui, calibrating: true, progress: 0});
    const interval = setInterval(() => {
      setUI(prev => {
        const progress = prev.progress + 20;
        if (progress >= 100) {
          clearInterval(interval);
          const calStatus = {...prev.calStatus, [prev.calType]: true};
          if ((step === 3 && prev.calType === 'wave') || 
              (step === 4 && prev.calType === 'beam') || 
              (step === 5 && prev.calType === 'align')) nextStep();
          return {...prev, calibrating: false, progress: 100, calStatus};
        }
        return {...prev, progress};
      });
    }, 300);
  };

  const reset = () => {
    setStep(0);
    setUI({
      console: 'built-in',
      calType: null,
      uploaded: false,
      calibrating: false,
      progress: 0,
      calStatus: {wave: false, beam: false, align: false}
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 p-2 text-sm font-sans">
      <header className="bg-blue-800 text-white p-1 flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="mr-2">📊</span>
          <span className="font-bold">XLR 860ix Operator Training - Step {step+1}/7</span>
        </div>
        <div className="flex space-x-2">
          <UIButton onClick={() => navigate('/')}>
            Back to Menu
          </UIButton>
          <UIButton onClick={reset}>
            Restart
          </UIButton>
        </div>
      </header>

      <div className="bg-gray-100 h-64 border border-gray-400 p-1 rounded mb-2">
        {step === 0 && <p>Step 1: Check maintenance status</p>}
        {step === 1 && (
          <p>
            Step 2: Console Access Method Selection:
            <br /><br />
            • <b>Built-in Console</b>: Access the integrated console by entering your secure operator credentials directly on the touchscreen. Follow the on-screen prompts to proceed.
            <br /><br />
            • <b>External Laptop</b>: Connect your external laptop via Ethernet using the machine’s designated LAN port (typically at IP 192.168.1.100). Launch the remote access software to operate the system.
            <br /><br />
            • <b>Handheld Terminal</b>: For field or quick diagnostics, connect using an RS-232 serial cable at 9600 baud. The handheld terminal provides a simplified interface for direct control.
          </p>
        )}
        {step === 2 && <p>Step 3: Upload wafer design</p>}
        {step === 3 && <p>Step 4: Run wavelength calibration</p>}
        {step === 4 && <p>Step 5: Run beam uniformity check</p>}
        {step === 5 && <p>Step 6: Run alignment calibration</p>}
        {step === 6 && <p>Training complete! Well done.</p>}
      </div>

      <div className="flex space-x-2 flex-1">
        <UIPanel className="w-1/3">
          <UIButton 
            className="w-full mb-1 text-left"
            highlighted={step === 0}
            onClick={() => step === 0 && nextStep()}
          >
            System Status
          </UIButton>

          <div className="border border-gray-400 p-1 rounded mb-2">
            <div>Pulses: <b>{(pulseCount/1e9).toFixed(1)}B</b>/40.0B</div>
            <div className="bg-gray-800 h-2 w-full mt-1 border border-gray-600">
              <div className="bg-yellow-400 h-full" style={{width: '99%'}}></div>
            </div>
            <div className="text-xs text-red-600">WARNING: Maintenance needed</div>
          </div>

          <UIButton className="w-full mb-1 text-left">Console Access</UIButton>

          <div className="border border-gray-400 p-1 rounded mb-2">
            <button className={`w-full text-left p-1 mb-1
                ${ui.console === 'built-in' ? 'bg-blue-100 border border-gray-100 border-r-gray-800 border-b-gray-800' : 'bg-gray-300 border-t border-l border-gray-100 border-r border-b border-gray-800'}
                ${step === 1 ? 'ring-1 ring-blue-700' : ''}`}
                onClick={() => {setUI({...ui, console: 'built-in'}); step === 1 && nextStep();}}>
              Built-in Console
            </button>

            <div className={`relative mb-1 
                ${ui.console === 'laptop' ? 'bg-blue-100 border border-gray-100 border-r-gray-800 border-b-gray-800' : 'bg-gray-300 border-t border-l border-gray-100 border-r border-b border-gray-800'} 
                ${step === 1 ? 'ring-1 ring-blue-700' : ''}`}>
              <button className="w-full text-left p-1"
                  onClick={() => {setUI({...ui, console: 'laptop'}); step === 1 && nextStep();}}>
                External Laptop
              </button>
              {ui.console === 'laptop' && (
                <div className="mt-1 px-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Connected via ethernet (192.168.1.100)</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`relative 
                ${ui.console === 'handheld' ? 'bg-blue-100 border border-gray-100 border-r-gray-800 border-b-gray-800' : 'bg-gray-300 border-t border-l border-gray-100 border-r border-b border-gray-800'} 
                ${step === 1 ? 'ring-1 ring-blue-700' : ''}`}>
              <button className="w-full text-left p-1"
                  onClick={() => {setUI({...ui, console: 'handheld'}); step === 1 && nextStep();}}>
                Handheld Terminal
              </button>
              {ui.console === 'handheld' && (
                <div className="mt-1 px-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Connected via RS-232 serial port (9600 baud)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <UIButton className="w-full mb-1 text-left">Wafer Management</UIButton>
          
          <UIButton
            className="w-full mb-1"
            onClick={() => {setUI({...ui, uploaded: true}); step === 2 && nextStep();}} 
            disabled={ui.uploaded}
            highlighted={step === 2 && !ui.uploaded}
          >
            {ui.uploaded ? "Upload Complete" : "Upload Wafer Design"}
          </UIButton>
        </UIPanel>
        
        <UIPanel className="w-2/3">
          <div className="flex space-x-1 mb-2">
            {[{id: 'wave', name: 'Wavelength', step: 3}, 
              {id: 'beam', name: 'Beam Uniformity', step: 4}, 
              {id: 'align', name: 'Alignment', step: 5}].map(cal => (
              <UIButton 
                key={cal.id} 
                className="flex-1"
                onClick={() => setUI({...ui, calType: cal.id})}
                highlighted={step === cal.step && !ui.calStatus[cal.id]}
              >
                {cal.name}
              </UIButton>
            ))}
          </div>

          {ui.calType && (
            <div className="border border-gray-400 p-1 rounded bg-gray-100 mb-2">
              <div className="flex justify-between mb-1">
                <div>Status: {ui.calStatus[ui.calType] ? "Complete" : "Required"}</div>
                <div>Target: {ui.calType === 'wave' ? '193nm' : 
                              ui.calType === 'beam' ? '≤1.5%' : '≤5nm'}</div>
              </div>

              <UIButton
                className="w-full"
                onClick={runCal} 
                disabled={ui.calStatus[ui.calType] || ui.calibrating}
                highlighted={step === (ui.calType === 'wave' ? 3 : ui.calType === 'beam' ? 4 : 5) && !ui.calStatus[ui.calType]}
              >
                {ui.calStatus[ui.calType] ? "Complete" : 
                 ui.calibrating ? `${ui.progress}%` : "Run Calibration"}
              </UIButton>
            </div>
          )}

          <UIWindow className="p-1 h-30 bg-black text-green-500 font-mono overflow-auto text-xs">
            <div>XLR 860ix ({ui.console}) | Pulses: {(pulseCount/1e9).toFixed(1)}B</div>
            {ui.calibrating ? (
              <>
                <div>CALIBRATING: {ui.calType} ({ui.progress}%)</div>
                <div className="bg-gray-800 h-1">
                  <div className="bg-cyan-500 h-1" style={{width: `${ui.progress}%`}}></div>
                </div>
              </>
            ) : (
              <>
                {pulseCount > 39e9 && <div className="text-yellow-300">WARNING: Maintenance</div>}
                {ui.uploaded && <div className="text-cyan-400">Design uploaded</div>}
                {Object.entries(ui.calStatus).map(([k,v]) => v && 
                  <div key={k} className="text-cyan-400">
                    {k === 'wave' ? 'Wavelength: 193nm' : 
                    k === 'beam' ? 'Beam: 1.2%' : 'Align: <5nm'}
                  </div>
                )}
                <div className="text-white">C:\\ _</div>
              </>
            )}
          </UIWindow>
        </UIPanel>
      </div>
    </div>
  );
};

export default OperatorUI;
