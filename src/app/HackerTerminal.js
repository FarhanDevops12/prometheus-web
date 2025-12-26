import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
//  Menambahkan ikon yang dibutuhkan dari lucide-react
import { Download, Copy, Check, Terminal } from 'lucide-react'; 

export default function HackerTerminal({ logs, output, isCritical }) {
  const scrollRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll logic [cite: 45]
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, output]);

  const textColor = isCritical ? 'text-alert-red' : 'text-terminal-green';
  const borderColor = isCritical ? 'border-alert-red' : 'border-terminal-green/30';
  const iconHoverColor = isCritical ? 'hover:bg-red-900/30' : 'hover:bg-green-900/30';

  // --- LOGIC: HANDLE COPY ---
  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon setelah 2 detik
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // --- LOGIC: HANDLE DOWNLOAD (File Sementara) ---
  const handleDownload = () => {
    if (!output) return;
    
    // 1. Buat Blob dari string output (tipe text/x-lua atau text/plain)
    const blob = new Blob([output], { type: 'text/x-lua' });
    
    // 2. Buat URL sementara (Object URL)
    const url = URL.createObjectURL(blob);
    
    // 3. Buat elemen <a> tersembunyi untuk memicu download
    const a = document.createElement('a');
    a.href = url;
    a.download = `protected_${Date.now()}.lua`; // Nama file unik berdasarkan waktu
    document.body.appendChild(a);
    a.click();
    
    // 4. Bersihkan (Hapus elemen dan revoke URL agar hemat memori)
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-full h-full bg-black border-l ${borderColor} relative flex flex-col font-mono text-xs md:text-sm p-4 transition-colors duration-500`}>
      
      {/* Decorative Header */}
      <div className="flex justify-between items-center mb-4 opacity-50 select-none border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span>/usr/bin/prometheus_core</span>
        </div>
        <span>PID: {Math.floor(Math.random() * 9999)}</span>
      </div>

      {/* TERMINAL BODY */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto custom-scroll space-y-1 pr-2">
        
        {/* BOOT SEQUENCE LOGS */}
        {logs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={`${textColor} opacity-90 break-words`}
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

        {/* FINAL OUTPUT PAYLOAD & ACTIONS */}
        {output && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 border-t border-dashed border-gray-700 pt-4"
          >
            {/* Toolbar Action Buttons */}
            <div className="flex justify-between items-end mb-2">
                <div className="text-hacker-cyan font-bold tracking-widest">PAYLOAD GENERATED:</div>
                
                <div className="flex gap-2">
                    {/* Tombol Copy */}
                    <button 
                        onClick={handleCopy}
                        className={`p-2 border border-gray-700 rounded ${iconHoverColor} transition-colors group relative`}
                        title="Copy to Clipboard"
                    >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className={textColor} />}
                    </button>

                    {/* Tombol Download */}
                    <button 
                        onClick={handleDownload}
                        className={`p-2 border border-gray-700 rounded ${iconHoverColor} transition-colors`}
                        title="Download .lua File"
                    >
                        <Download size={16} className={textColor} />
                    </button>
                </div>
            </div>

            {/* Area Text Output */}
            <textarea 
              readOnly 
              value={output}
              className={`w-full h-64 bg-black/50 border border-gray-800 p-3 rounded ${textColor} focus:outline-none focus:border-gray-600 resize-none font-mono text-xs`} 
              spellCheck="false" 
            />
            
            <div className="text-[10px] text-gray-500 mt-1 text-right">
                {output.length} BYTES WRITTEN
            </div>
          </motion.div>
        )}
        
        {/* BLINKING CURSOR (Only show when not showing output to reduce visual clutter) */}
        {!output && <span className={`inline-block w-2 h-4 ${isCritical ? 'bg-red-500' : 'bg-green-500'} animate-cursor-blink align-middle ml-1`} />}
      </div>
    </div>
  );
}