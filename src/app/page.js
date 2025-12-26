'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Zap, Copy, Terminal, Shield, Cpu, Lock, 
  Activity, CheckCircle, XCircle, AlertTriangle 
} from 'lucide-react';

// --- COMPONENTS ---

const CyberButton = ({ onClick, disabled, children, color = 'cyan' }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`
      relative w-full py-4 px-6 font-bold uppercase tracking-widest text-sm transition-all
      border border-${color === 'pink' ? 'cyber-pink' : 'cyber-cyan'} 
      text-${color === 'pink' ? 'cyber-pink' : 'cyber-cyan'}
      hover:bg-${color === 'pink' ? 'cyber-pink' : 'cyber-cyan'}/10
      hover:shadow-neon-${color === 'pink' ? 'pink' : 'cyan'}
      disabled:opacity-50 disabled:cursor-not-allowed
      group overflow-hidden
    `}
  >
    <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  </motion.button>
);

const PresetCard = ({ id, label, desc, active, onClick }) => (
  <div 
    onClick={() => onClick(id)}
    className={`
      cursor-pointer p-3 border transition-all duration-300 relative overflow-hidden group
      ${active 
        ? 'border-cyber-cyan bg-cyber-cyan/10 shadow-neon-cyan' 
        : 'border-white/10 hover:border-cyber-cyan/50 hover:bg-white/5'
      }
    `}
  >
    {active && <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-cyan shadow-neon-cyan" />}
    <h3 className={`font-bold text-sm ${active ? 'text-cyber-cyan' : 'text-slate-300'}`}>{label}</h3>
    <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">{desc}</p>
  </div>
);

// --- MAIN PAGE ---

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const presets = [
    { id: 'Minify', label: 'MINIFY', desc: 'Compact / Fast' },
    { id: 'Weak', label: 'WEAK', desc: 'Basic Layer' },
    { id: 'Medium', label: 'MEDIUM', desc: 'Standard Prot' },
    { id: 'Strong', label: 'STRONG', desc: 'Heavy Encrypt' },
    { id: 'MaxStrong', label: 'MAX', desc: 'Max Security' },
    { id: 'InsaneMode', label: 'INSANE', desc: 'Dual VM (Slow)' },
  ];

  const addLog = (msg, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time: timestamp, msg, type }]);
    // Auto scroll logs
    setTimeout(() => {
      const logContainer = document.getElementById('terminal-logs');
      if (logContainer) logContainer.scrollTop = logContainer.scrollHeight;
    }, 100);
  };

  const handleUpload = async () => {
    if (!file) return setError("NO_FILE_DETECTED: Harap upload script Lua.");
    
    setLoading(true);
    setError('');
    setOutput('');
    setLogs([]);
    
    addLog("Initializing Prometheus v2.5...", 'system');
    addLog(`Target File: ${file.name}`, 'info');
    addLog(`Security Level: ${preset.toUpperCase()}`, 'warn');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('preset', preset);

    try {
      // Fake processing steps for visual effect
      const steps = [
        "Analyzing syntax tree...",
        "Injecting anti-tamper runtime...",
        "Encrypting string constants...",
        "Building virtual machine instructions..."
      ];
      
      for (let i = 0; i < steps.length; i++) {
        setTimeout(() => addLog(steps[i], 'process'), i * 800 + 500);
      }

      const req = await fetch('/api/obfuscate', { method: 'POST', body: formData });
      const res = await req.json();

      // Wait a bit for "fake steps" to finish
      setTimeout(() => {
        if (req.ok) {
          addLog("Obfuscation Complete.", 'success');
          setOutput(res.code);
          // Scroll to bottom
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
          throw new Error(res.details || res.error);
        }
        setLoading(false);
      }, 4000);

    } catch (err) {
      setTimeout(() => {
        setError(err.message);
        addLog(`CRITICAL ERROR: ${err.message}`, 'error');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen relative p-4 md:p-8">
      {/* Background Grid CSS Animation */}
      <div className="cyber-grid"></div>

      <main className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        
        {/* --- HEADER --- */}
        <div className="lg:col-span-12 text-center mb-8">
          <div className="inline-block border border-cyber-cyan/30 bg-black/50 backdrop-blur px-4 py-1 rounded-sm mb-4">
            <span className="text-cyber-cyan text-xs font-mono animate-pulse">● SYSTEM ONLINE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter glitch" data-text="PROMETHEUS">
            PROMETHEUS
          </h1>
          <p className="text-slate-400 font-mono text-sm tracking-widest">LUA 5.1 OBFUSCATION ENGINE</p>
        </div>

        {/* --- LEFT PANEL: CONTROL --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-black/80 border border-white/10 p-1 backdrop-blur-md relative">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyber-cyan"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyber-cyan"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyber-cyan"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyber-cyan"></div>

            <div className="p-6 space-y-8">
              {/* Upload Section */}
              <div>
                <h2 className="text-cyber-cyan font-bold text-sm uppercase mb-4 flex items-center gap-2">
                  <Upload size={16} /> 1. Upload Source
                </h2>
                <div className="relative group cursor-pointer">
                  <input 
                    type="file" 
                    accept=".lua,.txt" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                  />
                  <div className={`
                    h-24 border border-dashed transition-all flex flex-col items-center justify-center
                    ${file ? 'border-cyber-cyan bg-cyber-cyan/5' : 'border-white/20 hover:border-cyber-cyan/50'}
                  `}>
                    {file ? (
                      <div className="text-center">
                        <p className="text-cyber-cyan font-bold">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size/1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <p className="text-slate-500 text-xs uppercase tracking-widest">Drop Lua File Here</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preset Section */}
              <div>
                <h2 className="text-cyber-pink font-bold text-sm uppercase mb-4 flex items-center gap-2">
                  <Shield size={16} /> 2. Security Level
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map(p => (
                    <PresetCard 
                      key={p.id} 
                      {...p} 
                      active={preset === p.id} 
                      onClick={setPreset} 
                    />
                  ))}
                </div>
              </div>

              {/* Action */}
              <div>
                 <CyberButton onClick={handleUpload} disabled={loading} color={loading ? 'cyan' : 'pink'}>
                    {loading ? <Activity className="animate-spin" /> : <Zap className="fill-current" />}
                    {loading ? 'PROCESSING...' : 'INITIATE'}
                 </CyberButton>

                 {error && (
                   <div className="mt-4 p-3 bg-cyber-red/10 border-l-2 border-cyber-red text-cyber-red text-xs font-mono flex gap-2">
                     <AlertTriangle size={14} /> {error}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: TERMINAL --- */}
        <div className="lg:col-span-7 flex flex-col h-[600px] lg:h-auto relative">
          <div className="bg-black/90 border border-white/10 flex-grow flex flex-col font-mono text-xs relative overflow-hidden">
             {/* Decorative header */}
             <div className="bg-white/5 p-2 flex justify-between items-center border-b border-white/10">
               <div className="flex gap-4">
                 <span className="text-slate-500">TERMINAL</span>
                 <span className="text-cyber-cyan">/bin/lua5.1</span>
               </div>
               <div className="flex gap-1">
                 <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-700"></div>
               </div>
             </div>

             {/* Terminal Output Area */}
             <div className="flex-grow relative flex flex-col">
                {/* 1. Logs View (Shows during loading or empty) */}
                <div 
                  id="terminal-logs"
                  className={`absolute inset-0 p-4 overflow-y-auto space-y-1 transition-opacity duration-300 ${output ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <div className="text-slate-600 mb-4">
                    Prometheus OS [Version 2.0.5]<br/>
                    (c) 2025 Prometheus Security. All rights reserved.<br/>
                    <br/>
                    Ready for input...
                  </div>
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className={`
                        ${log.type === 'system' ? 'text-cyber-cyan font-bold' : ''}
                        ${log.type === 'error' ? 'text-cyber-red font-bold' : ''}
                        ${log.type === 'success' ? 'text-green-400 font-bold' : ''}
                        ${log.type === 'info' ? 'text-slate-300' : ''}
                        ${log.type === 'process' ? 'text-cyber-pink animate-pulse' : ''}
                      `}>
                        {log.type === 'process' ? '>> ' : ''}{log.msg}
                      </span>
                    </div>
                  ))}
                  {loading && <div className="w-2 h-4 bg-cyber-cyan animate-pulse"></div>}
                </div>

                {/* 2. Code Output View (Shows when success) */}
                {output && (
                  <div className="absolute inset-0 flex flex-col animate-in fade-in duration-500">
                    <textarea 
                      readOnly 
                      value={output}
                      className="flex-grow bg-transparent p-4 text-green-400 focus:outline-none resize-none custom-scrollbar"
                      spellCheck="false"
                    />
                    <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                      <span className="text-slate-500">Ln {output.split('\n').length}, UTF-8</span>
                      <button 
                        onClick={() => {navigator.clipboard.writeText(output); alert("COPIED!")}}
                        className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 text-[10px] font-bold uppercase tracking-widest hover:bg-green-500/40 transition-colors"
                      >
                        COPY CODE
                      </button>
                    </div>
                  </div>
                )}
             </div>
          </div>
          <div ref={bottomRef}></div>
        </div>

        {/* --- FEATURES FOOTER --- */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
           {[
             { icon: Cpu, title: "Virtual Machine", desc: "Custom Bytecode execution" },
             { icon: Lock, title: "Poly-Encryption", desc: "Dynamic string protection" },
             { icon: AlertTriangle, title: "Anti-Tamper", desc: "Runtime integrity check" }
           ].map((f, i) => (
             <div key={i} className="bg-black/50 border border-white/5 p-4 flex items-center gap-4">
               <div className="p-2 bg-cyber-cyan/10 rounded-full">
                 <f.icon className="text-cyber-cyan" size={20} />
               </div>
               <div>
                 <h4 className="text-white font-bold text-xs uppercase">{f.title}</h4>
                 <p className="text-slate-500 text-[10px]">{f.desc}</p>
               </div>
             </div>
           ))}
        </div>

      </main>
    </div>
  );
}