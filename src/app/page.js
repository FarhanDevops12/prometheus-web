'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ControlModule from './ControlModule'; // Component we just made
import HackerTerminal from './HackerTerminal'; // Component we just made

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium'); 
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  
  // INSANE MODE TRIGGER
  const isCritical = preset === 'InsaneMode';

  const addLog = (msg) => setLogs(prev => [...prev, msg]);

  const handleUpload = async () => {
    if (!file) {
        addLog("[ERR] TARGET_FILE_MISSING");
        return;
    }
    setLoading(true);
    setOutput('');
    setLogs([]);
    
    // TACTICAL LOGGING SEQUENCE
    const steps = [
        `[SYS] MOUNTING DRIVE: ${file.name.toUpperCase()}...`,
        `[CFG] SECURITY LEVEL: ${preset.toUpperCase()}`,
        "[NET] BYPASSING FIREWALL...",
        "[CPU] ALLOCATING RESOURCES..."
    ];

    // Staggered logs for dramatic effect
    for (let i = 0; i < steps.length; i++) {
        setTimeout(() => addLog(steps[i]), i * 400);
    }

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('preset', preset);
        
        // Execute API call [cite: 20]
        const req = await fetch('/api/obfuscate', { method: 'POST', body: formData });
        const res = await req.json();

        if (req.ok) {
            setTimeout(() => {
                addLog("[OK] PAYLOAD GENERATED SUCCESSFULLY.");
                setOutput(res.code);
                setLoading(false);
            }, 2500); // Artificial delay to make it feel like "hacking"
        } else {
            throw new Error(res.details || "UNKNOWN_ERROR");
        }
    } catch (err) {
        setTimeout(() => {
            addLog(`[ERR] ${err.message.toUpperCase()}`);
            setLoading(false);
        }, 1500);
    }
  };

  return (
    // MAIN CONTAINER - NO SCROLL
    <div className={`h-screen w-screen overflow-hidden relative flex items-center justify-center bg-black transition-colors duration-1000 ${isCritical ? 'shadow-[inset_0_0_100px_rgba(255,0,0,0.2)]' : ''}`}>
      
      {/* GLOBAL OVERLAYS */}
      <div className="crt-overlay"></div>
      <div className="vignette"></div>

      {/* THE RIG (Main Window) */}
      <motion.div 
        initial={{ scaleY: 0.1, opacity: 0 }} 
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className={`
          relative z-10 w-full h-full md:h-[90vh] md:w-[95vw] max-w-7xl 
          border ${isCritical ? 'border-red-900' : 'border-gray-800'} 
          bg-black shadow-2xl flex flex-col md:flex-row
        `}
      >
        <ControlModule 
            file={file} 
            setFile={setFile} 
            preset={preset} 
            setPreset={setPreset} 
            loading={loading}
            onFire={handleUpload}
        />
        
        <HackerTerminal 
            logs={logs} 
            output={output}
            isCritical={isCritical}
        />

      </motion.div>
    </div>
  );
}