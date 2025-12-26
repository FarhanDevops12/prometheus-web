import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ChevronDown, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function ControlModule({ file, setFile, preset, setPreset, onFire, loading }) {
  const isInsane = preset === 'InsaneMode';
  const theme = isInsane ? 'red' : 'green';
  
  // Dynamic border colors based on mode
  const borderClass = isInsane ? 'border-alert-red' : 'border-terminal-green';
  const textClass = isInsane ? 'text-alert-red' : 'text-terminal-green';

  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col gap-8 bg-black/80 relative z-20">
      
      {/* HEADER */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className={`text-4xl font-mono font-bold tracking-tighter ${textClass} glow-text`}>
          PROMETHEUS
        </h1>
        <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono uppercase">
          <span>Ver 0.9.1b</span>
          <span>Unregistered Hypervisor</span>
        </div>
      </div>

      {/* INPUT 1: DATA DROP */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">[1] SELECT_SOURCE_FILE</label>
        <div className="relative group">
          <input 
            type="file" 
            [cite_start]accept=".lua,.txt" // [cite: 28]
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          />
          <div className={`
            h-16 border-2 border-dashed ${file ? borderClass : 'border-gray-700'} 
            bg-black flex items-center px-4 transition-all group-hover:bg-gray-900
          `}>
             {file ? (
               <div className="flex items-center gap-3 w-full">
                 <div className={`w-2 h-2 ${isInsane ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                 <span className={`font-mono text-sm truncate ${textClass}`}>{file.name}</span>
               </div>
             ) : (
               <span className="text-gray-600 font-mono text-xs">NO_DATA_STREAM_DETECTED</span>
             )}
          </div>
        </div>
      </div>

      {/* INPUT 2: SECURITY LEVEL */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">[2] OBFUSCATION_DEPTH</label>
        <div className="relative">
          <select 
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className={`
              w-full bg-black border ${borderClass} text-gray-300 font-mono text-sm py-3 px-4 
              appearance-none rounded-none focus:outline-none focus:ring-1 focus:ring-${theme}-500
            `}
          >
            <option value="Minify">LVL 1: MINIFY</option>
            <option value="Medium">LVL 2: STANDARD</option>
            <option value="Strong">LVL 3: STRONG</option>
            <option value="InsaneMode">LVL 4: INSANE (UNSTABLE)</option>
          </select>
          <div className="absolute right-4 top-4 pointer-events-none">
            <ChevronDown size={14} className={textClass} />
          </div>
        </div>
        
        {/* WARNING PANEL FOR INSANE MODE */}
        {isInsane && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} 
             animate={{ opacity: 1, height: 'auto' }}
             className="border border-red-900 bg-red-900/10 p-2 flex items-center gap-2 text-[10px] text-red-500 font-mono"
           >
             <ShieldAlert size={12} />
             WARNING: CPU LOAD CRITICAL. TIMEOUT RISK.
           </motion.div>
        )}
      </div>

      {/* ACTION: EXECUTE BUTTON */}
      <div className="mt-auto">
        <button
          onClick={onFire}
          disabled={loading}
          className={`
            w-full py-6 text-xl font-black font-mono tracking-[0.2em] uppercase border-2 transition-all relative overflow-hidden group
            ${loading ? 'border-gray-800 text-gray-600' : `${borderClass} ${textClass} hover:bg-${theme}-900/20`}
          `}
        >
          {/* Scanline inside button */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? 'INITIALIZING...' : '>> EXECUTE <<'}
          </span>
        </button>
      </div>

    </div>
  );
}