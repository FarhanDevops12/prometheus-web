import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HackerTerminal({ logs, output, isCritical }) {
  const scrollRef = useRef(null);

  // Auto-scroll logic [cite: 15]
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, output]);

  const textColor = isCritical ? 'text-alert-red' : 'text-terminal-green';
  const borderColor = isCritical ? 'border-alert-red' : 'border-terminal-green/30';

  return (
    <div className={`w-full h-full bg-black border-l ${borderColor} relative flex flex-col font-mono text-xs md:text-sm p-4`}>
      {/* Decorative Header */}
      <div className="flex justify-between items-center mb-4 opacity-50 select-none">
        <span>/usr/bin/prometheus_core</span>
        <span>PID: {Math.floor(Math.random() * 9999)}</span>
      </div>

      {/* TERMINAL BODY */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto custom-scroll space-y-1">
        
        {/* BOOT SEQUENCE LOGS */}
        {logs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={`${textColor} opacity-90`}
          >
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString('en-US', {hour12:false})}]</span>
            <span className="font-bold mr-2">{log.startsWith('[ERR]') ? '>>' : '>'}</span>
            {log}
          </motion.div>
        ))}

        {/* LOADING INDICATOR */}
        {logs.length > 0 && !output && (
           <div className="animate-pulse mt-2 text-hacker-cyan">
             _PROCESSING_THREAD_ACTIVE...
           </div>
        )}

        {/* FINAL OUTPUT PAYLOAD */}
        {output && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 border-t border-dashed border-gray-700 pt-4"
          >
            <div className="text-hacker-cyan mb-2">PAYLOAD GENERATED:</div>
            <textarea 
              readOnly 
              value={output}
              className={`w-full h-64 bg-transparent ${textColor} focus:outline-none resize-none`} 
              spellCheck="false" 
            />
          </motion.div>
        )}
        
        {/* BLINKING CURSOR */}
        {!output && <span className="inline-block w-2 h-4 bg-green-500 animate-cursor-blink align-middle ml-1" />}
      </div>
    </div>
  );
}