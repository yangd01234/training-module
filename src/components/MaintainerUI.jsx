import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UIButton, UIPanel, UIWindow } from './ui';
import xlrImage from '../static/xlr_internals.png';
import xlrDoorImage from '../static/xlr_door.png';

const MaintainerUI = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [refillStep, setRefillStep] = useState(0);
  const [ui, setUI] = useState({
    safetyChecked: false,
    tankRefilled: false,
    calibrating: false,
    progress: 0,
    showSafetyLabel: false,
    showInternalView: false,
    showExternalView: true,
    doorOpen: false,
    pressureLevel: 0
  });

  const nextStep = () => setStep(s => s < 2 ? s + 1 : s);

  const nextRefillStep = () => {
    const nextStep = refillStep + 1;
    setRefillStep(nextStep);
    if (nextStep === 8) {
      setUI(prev => ({ ...prev, tankRefilled: true }));
    }
  };

  const reset = () => {
    setStep(0);
    setRefillStep(0);
    setUI({
      safetyChecked: false,
      tankRefilled: false,
      calibrating: false,
      progress: 0,
      showSafetyLabel: false,
      showInternalView: false,
      showExternalView: true,
      doorOpen: false,
      pressureLevel: 0
    });
  };

  const renderRefillStepPrompt = () => {
    switch(refillStep) {
      case 0: return "PUT ON proper PPE (gloves, face shield, lab coat)";
      case 1: return "VERIFY laser is in standby mode";
      case 2: return "OPEN maintenance access panel B";
      case 3: return "LOCATE gas cabinet door (right side)";
      case 4: return "CONNECT ArF cylinder to intake port";
      case 5: return "MONITOR pressure gauges (max 3.5 Bar)";
      case 6: return "SECURE cabinet and access panel";
      case 7: return "Refill procedure complete!";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 p-2 text-sm font-sans">
      <header className="bg-blue-800 text-white p-1 flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="mr-2">📊</span>
          <span className="font-bold">XLR 860ix Maintainer Training</span>
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

      <div className="bg-gray-100 border border-gray-400 p-1 rounded mb-2">
        {step === 0 && <p>Step 1: View the laser safety label</p>}
        {step === 1 && <p>Step 2: Refill the argon fluoride tank</p>}
        {step === 2 && <p>Maintenance training complete! All systems operational.</p>}
      </div>

      <div className="flex space-x-2 flex-1">
        <UIPanel className="w-1/3">
          <UIButton 
            className="w-full mb-1 bg-gray-300 text-left"
            onClick={() => {
              setUI({...ui, showSafetyLabel: false, showExternalView: true, showInternalView: false});
            }}
          >
            <span className="text-red-600 font-bold">CLASS 4 LASER PRODUCT</span>
          </UIButton>

          <div className="border border-gray-400 p-1 mb-2">
            <div className="text-red-600 font-bold">CLASS 4 LASER PRODUCT</div>
            <div className="text-xs">
              <p>DANGER: Invisible laser radiation</p>
              <p>Avoid eye or skin exposure to direct or scattered radiation</p>
              <p>Max output power: 25W</p>
              <p>Wavelength: 193nm</p>
            </div>

            <UIButton 
              className="w-full mt-1"
              highlighted={step === 0}
              onClick={() => {
                setUI({...ui, showSafetyLabel: true, showExternalView: false, safetyChecked: true});
                if (step === 0) nextStep();
              }}
            >
              View Safety Label
            </UIButton>
          </div>

          <UIButton 
            className="w-full mb-1 text-left"
            onClick={() => {
              setUI({...ui, showInternalView: true, showExternalView: false, showSafetyLabel: false});
            }}
          >
            System Components
          </UIButton>

          <div className="border border-gray-400 p-1 mb-2">
            <div className="font-bold">Argon Fluoride Tank</div>

            <div className="mt-1 text-xs border border-gray-400 p-1 bg-gray-100">
              <div className="font-bold text-black">SAFETY PROCEDURE FOR ArF REFILL:</div>
              <ol className="list-decimal list-inside">
                {[
                  "PUT ON proper PPE (gloves, face shield, lab coat)",
                  "VERIFY laser is in standby mode",
                  "OPEN maintenance access panel B",
                  "LOCATE gas cabinet door (right side)",
                  "CONNECT ArF cylinder to intake port",
                  "MONITOR pressure gauges (max 3.5 Bar)",
                  "SECURE cabinet and access panel"
                ].map((text, index) => (
                  <li key={index} className={refillStep > index ? "text-green-700 line-through" : ""}>{text}</li>
                ))}
              </ol>
            </div>

            <UIButton 
              className="w-full mt-1"
              onClick={() => {
                if (step === 1 && !ui.tankRefilled && refillStep === 0) {
                  setRefillStep(1);
                  setUI({...ui, showInternalView: true, showExternalView: true, showSafetyLabel: false});
                }
              }}
              disabled={ui.tankRefilled || refillStep > 0}
              highlighted={step === 1 && !ui.tankRefilled && refillStep === 0}
            >
              {ui.tankRefilled ? "Refill Complete" : "Start ArF Tank Refill"}
            </UIButton>
          </div>
        </UIPanel>

        <UIPanel className="w-2/3">
          <UIWindow className="h-64 overflow-hidden relative">
            {ui.showSafetyLabel && (
              <div className="h-full flex items-center justify-center bg-gray-100 p-2">
                <div className="bg-yellow-300 border-2 border-black p-2">
                  <div className="text-black font-bold text-center">DANGER</div>
                  <div className="text-black font-bold text-center">INVISIBLE LASER RADIATION</div>
                  <div className="text-black text-center text-sm">AVOID EYE OR SKIN EXPOSURE TO</div>
                  <div className="text-black text-center text-sm">DIRECT OR SCATTERED RADIATION</div>
                  <div className="text-black text-center text-xs mt-1">IEC 60825-1 2014-05</div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>MAX OUTPUT POWER: 25W</span>
                    <span>WAVELENGTH: 193 nm</span>
                  </div>
                  <div className="text-black font-bold text-center mt-1">CLASS 4 LASER PRODUCT</div>
                </div>
              </div>
            )}
            {ui.showExternalView && (
              <div 
                className="absolute inset-0 h-full bg-gray-600 flex items-center justify-center"
                style={{zIndex: 0}}
              >
                <div 
                  className="relative h-full max-h-full max-w-full" 
                  style={{
                    width: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={ui.doorOpen ? xlrImage : xlrDoorImage} 
                    alt="XLR 860ix"
                    className="max-h-full max-w-full object-contain"
                    style={{transition: 'opacity 0.5s ease'}}
                  />
                </div>
              </div>
            )}
            {ui.showInternalView && (
              <div className="absolute inset-0 h-full bg-gray-600 bg-opacity-70 flex items-center justify-center" style={{ zIndex: 1 }}>
                {/* Interactive refill process */}
                <div className="absolute inset-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-auto h-full flex items-center justify-center text-white text-xs" style={{ aspectRatio: "4/3" }}>
                      {/* Current refill step interactive elements */}
                      {refillStep === 1 && (
                        <div className="absolute top-4 left-4 text-green-400 bg-black bg-opacity-70 p-2 border border-gray-100 border-r-gray-800 border-b-gray-800">
                          <div>LASER STATUS: STANDBY</div>
                          <UIButton 
                            className="mt-2"
                            onClick={nextRefillStep}
                          >
                            Confirm Standby Mode
                          </UIButton>
                        </div>
                      )}
                      {refillStep === 2 && (
                        <div className="absolute translate-x-[-90px] translate-y-[80px] animate-pulse" style={{zIndex: 5}}>
                          <div 
                            className="px-2 py-1 bg-yellow-300 bg-opacity-90 text-xs text-black cursor-pointer"
                            onClick={() => {
                              setUI(prev => ({...prev, doorOpen: true}));
                              nextRefillStep();
                            }}
                          >
                            Access Panel B
                          </div>
                          <div className="text-white text-xs mt-1 text-center">
                            Click to open
                          </div>
                        </div>
                      )}
                      {refillStep === 3 && (
                        <div className="absolute translate-x-[90px] translate-y-[-20px] animate-pulse" style={{zIndex: 5}}>
                          <div 
                            className="px-2 py-1 bg-gray-800 text-white text-xs cursor-pointer"
                            onClick={nextRefillStep}
                          >
                            Gas Cabinet
                          </div>
                          <div className="text-white text-xs mt-1 text-center">
                            Click to locate
                          </div>
                        </div>
                      )}
                      {refillStep === 4 && (
                        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
                          <div className="w-16 h-24 bg-gray-400 border-t border-l border-gray-100 border-r border-b border-gray-800 relative">
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full"></div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-center text-black">ArF</div>
                          </div>
                          <UIButton 
                            className="mt-1 w-full"
                            onClick={nextRefillStep}
                          >
                            Connect Cylinder
                          </UIButton>
                        </div>
                      )}
                      {refillStep === 5 && (
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-32 h-16 bg-gray-800 border border-gray-600 relative">
                            <div className="absolute top-1 left-0 right-0 text-xs text-center text-white">
                              Pressure: {ui.pressureLevel.toFixed(1)} Bar
                            </div>
                            <div className="absolute bottom-4 left-2 right-2 h-4 bg-gray-700">
                              <div 
                                className="h-full transition-all duration-500"
                                style={{
                                  width: `${(ui.pressureLevel / 5) * 100}%`,
                                  backgroundColor: ui.pressureLevel > 3.5 ? 'red' : 'green'
                                }}
                              ></div>
                            </div>
                            <div className="absolute -bottom-5 left-0 right-0 text-xs text-center text-white">
                              {ui.pressureLevel > 3.5 ? "WARNING: PRESSURE TOO HIGH" : ""}
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={ui.pressureLevel}
                            onChange={(e) => setUI({...ui, pressureLevel: parseFloat(e.target.value)})}
                            className="mt-4 w-full cursor-pointer"
                            style={{width: "100%"}}
                          />
                          <UIButton 
                            className="mt-1 w-full"
                            onClick={nextRefillStep}
                            disabled={ui.pressureLevel > 3.5}
                          >
                            Confirm Pressure OK
                          </UIButton>
                        </div>
                      )}
                      {refillStep === 6 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gray-300 p-4 border-t border-l border-gray-100 border-r border-b border-gray-800">
                            <div className="flex space-x-4">
                              <UIButton
                                onClick={() => {
                                  setUI(prev => ({...prev, doorOpen: false}));
                                  nextRefillStep();
                                }}
                              >
                                Secure Cabinet and Panel
                              </UIButton>
                            </div>
                          </div>
                        </div>
                      )}
                      {refillStep === 7 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gray-300 p-4 border-t border-l border-gray-100 border-r border-b border-gray-800 text-center">
                            <div className="text-green-700 text-lg font-bold mb-2">ArF Tank Refill Complete!</div>
                            <div className="text-black mb-4">Tank Level: 95%</div>
                            <UIButton
                              onClick={reset}
                            >
                              Complete Procedure
                            </UIButton>
                          </div>
                        </div>
                      )}
                      <div className="absolute translate-x-[230px] top-0 h-full flex items-center">
                        <div className="w-20 h-32 bg-gray-700 bg-opacity-80 border border-gray-900">
                          <div className="text-xs text-center text-white mt-1">Gas System</div>
                          <div className="mx-auto mt-2 w-12 h-20 bg-gray-200 border border-gray-900 flex flex-col items-center justify-center">
                            <div className="text-xs text-center">ArF</div>
                            <div className="w-8 h-12 bg-gray-800 mt-1 relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-blue-500" 
                                  style={{
                                    height: refillStep >= 7 ? '90%' : refillStep > 4 ? (15 + (refillStep - 4) * 20) + '%' : '15%', 
                                    transition: 'height 1s'
                                  }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </UIWindow>
          <UIWindow className="mt-2 p-1 h-48 bg-black text-green-500 font-mono overflow-auto text-xs">
            <div>XLR 860ix Maintenance Console</div>
            <div>------------------------------------</div>
            {refillStep > 0 && refillStep < 8 ? (
              <>
                <div className="text-yellow-300">INTERACTIVE REFILL PROCEDURE - STEP {refillStep}/7</div>
                <div className="text-white mt-1">{renderRefillStepPrompt()}</div>
                <div className="text-cyan-400 mt-1">
                  {refillStep === 1 && "Laser system is in STANDBY mode."}
                  {refillStep === 2 && "Access panel B ready to open."}
                  {refillStep === 3 && "Gas cabinet located on right side of system."}
                  {refillStep === 4 && "ArF cylinder ready for connection."}
                  {refillStep === 5 && "Pressure should not exceed 3.5 Bar."}
                  {refillStep === 6 && "All valves closed. Ready to secure panels."}
                  {refillStep === 7 && "Procedure complete! Tank level at 95%."}
                </div>
              </>
            ) : (
              <>
                <div>Status: {ui.tankRefilled && ui.safetyChecked ? "System operational" : "Maintenance required"}</div>
                {!ui.safetyChecked && <div className="text-yellow-300">WARNING: Safety check required</div>}
                {!ui.tankRefilled && (
                  <>
                    <div className="text-red-500">ALERT: ArF tank level critical (15%)</div>
                    <div className="text-gray-400">Last refill: 42 days ago (05/28/2025)</div>
                  </>
                )}
                {ui.safetyChecked && <div className="text-cyan-400">Safety verification complete</div>}
                {ui.tankRefilled && (
                  <>
                    <div className="text-cyan-400">ArF tank refilled successfully (95%)</div>
                    <div className="text-gray-400">Last refill: Today (03/11/2025)</div>
                  </>
                )}
                {step === 2 && <div className="text-cyan-400">Maintenance complete - system ready</div>}
                <div className="text-white">C:\\ _</div>
              </>
            )}
          </UIWindow>
        </UIPanel>
      </div>
    </div>
  );
};

export default MaintainerUI;
