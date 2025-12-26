'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileCode, Zap, Copy, Shield, Cpu, 
  Ghost, Check, Terminal, Code2, AlertTriangle, Download 
} from 'lucide-react';

// --- Components ---

const BackgroundGradient = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#030014]">
    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
    <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${color} shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const presets = [
    { id: 'Minify', label: 'Minify', desc: 'Ringan & Cepat' },
    { id: 'Weak', label: 'Weak', desc: 'Proteksi Dasar' },
    { id: 'Medium', label: 'Medium', desc: 'Standar Industri' },
    { id: 'Strong', label: 'Strong', desc: 'Enkripsi Kuat' },
    { id: 'MaxStrong', label: 'Max Strong', desc: 'Maksimum' },
    { id: 'InsaneMode', label: 'Insane 💀', desc: 'VM Ganda (Berat)' },
  ];

  const addLog = (msg) => setLogs(prev => [...prev, msg]);

  const handleUpload = async () => {
    if (!file) return setError("⚠️ Pilih file script Lua terlebih dahulu!");
    
    setLoading(true);
    setError('');
    setOutput('');
    setLogs([]);
    addLog("[INIT] Memulai Prometheus Engine v2.0...");
    addLog(`[CONF] Preset terpilih: ${preset}`);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('preset', preset);

    try {
      const steps = [
        "[AST] Memparsing struktur kode...",
        "[ENC] Mengenkripsi string konstan...",
        "[VM] Membangun Virtual Machine kustom...",
        "[BYTE] Mengompilasi instruksi..."
      ];

      // Simulasi loading logs biar keren
      for (let i = 0; i < steps.length; i++) {
        setTimeout(() => addLog(steps[i]), 500 * (i + 1));
      }

      const req = await fetch('/api/obfuscate', { method: 'POST', body: formData });
      const res = await req.json();

      if (req.ok) {
        setTimeout(() => {
          addLog("[DONE] Obfuscation berhasil!");
          setOutput(res.code);
          outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 2500);
      } else {
        throw new Error(res.details || res.error);
      }
    } catch (err) {
      setError(err.message);
      addLog(`[ERR] ${err.message}`);
    } finally {
      setTimeout(() => setLoading(false), 2600);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans text-slate-200 selection:bg-pink-500/30 selection:text-pink-200">
      <BackgroundGradient />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        
        {/* --- Header --- */}
        <header className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-2xl shadow-purple-500/10"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              LUA 5.1 OBFUSCATION ENGINE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-purple-400/50 mb-6 drop-shadow-2xl"
          >
            PROMETHEUS
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            Amankan skrip Anda dengan teknologi <span className="text-purple-400 font-semibold">Virtualization</span> dan <span className="text-pink-400 font-semibold">Polymorphic Encryption</span> tercanggih di kelasnya.
          </motion.p>
        </header>

        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* LEFT: Config Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-[#0b0b10]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Gradient Border Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-70"></div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                  <Cpu className="w-6 h-6 text-pink-500" />
                  Konfigurasi Engine
                </h2>

                {/* 1. Upload */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Source Code</label>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      accept=".lua,.txt"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    <div className={`
                      h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300
                      ${file 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-slate-700 bg-black/20 group-hover:border-purple-400/50 group-hover:bg-purple-500/5'
                      }
                    `}>
                      {file ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in">
                          <FileCode className="w-10 h-10 text-purple-400 mb-2" />
                          <span className="font-bold text-white truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-purple-300">{(file.size/1024).toFixed(1)} KB</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400 group-hover:text-purple-300">
                          <Upload className="w-8 h-8 mb-3" />
                          <span className="text-sm font-medium">Klik atau Drop File Disini</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Preset Grid */}
                <div className="mb-8">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Mode Keamanan</label>
                  <div className="grid grid-cols-2 gap-3">
                    {presets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPreset(p.id)}
                        className={`p-3 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group
                          ${preset === p.id 
                            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 border-transparent text-white shadow-lg shadow-purple-900/20' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                          }
                        `}
                      >
                        <div className="font-bold text-sm relative z-10">{p.label}</div>
                        <div className={`text-[10px] relative z-10 ${preset === p.id ? 'text-purple-200' : 'text-slate-500'}`}>{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Action Button */}
                <button 
                  onClick={handleUpload}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl flex items-center justify-center gap-3 transition-all duration-300 group
                    ${loading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:shadow-purple-500/40 hover:scale-[1.02] text-white'
                    }`}
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> PROCESSING...</>
                  ) : (
                    <><Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" /> START OBFUSCATION</>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Output Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-7 flex flex-col h-full min-h-[500px]"
            ref={outputRef}
          >
            <div className="bg-[#08080a] border border-white/10 rounded-3xl shadow-2xl flex flex-col flex-grow overflow-hidden relative ring-1 ring-white/5">
              
              {/* Terminal Header */}
              <div className="bg-[#121214] border-b border-white/5 px-5 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  {loading ? 'Compiling...' : output ? 'Output.lua' : 'Console'}
                </div>
                {output ? (
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-green-500/20 hover:text-green-400 rounded-lg text-xs text-slate-300 transition-colors border border-white/5"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                ) : <div className="w-16" />}
              </div>

              {/* Terminal Content */}
              <div className="relative flex-grow bg-[#050505] p-0 font-mono text-sm overflow-hidden flex flex-col">
                
                {/* 1. Loading Logs */}
                {loading && (
                  <div className="p-6 space-y-2 h-full overflow-y-auto">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-500/80 border-l-2 border-green-900/50 pl-3 py-1"
                      >
                        <span className="text-green-700 mr-2">$</span>{log}
                      </motion.div>
                    ))}
                    <div className="w-3 h-5 bg-green-500 animate-pulse mt-2 inline-block" />
                  </div>
                )}

                {/* 2. Output Result */}
                {!loading && output && (
                  <textarea 
                    readOnly 
                    value={output} 
                    spellCheck="false"
                    className="w-full h-full bg-transparent text-slate-300 p-6 resize-none focus:outline-none leading-relaxed text-xs custom-scrollbar"
                  />
                )}

                {/* 3. Idle State */}
                {!loading && !output && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 pointer-events-none">
                    <Code2 className="w-24 h-24 mb-6 opacity-10" />
                    <p className="text-sm font-medium opacity-30 uppercase tracking-[0.2em]">Ready for Injection</p>
                  </div>
                )}
              </div>

              {/* Footer Bar */}
              <div className="bg-[#0a0a0c] border-t border-white/5 px-4 py-2 flex justify-between text-[10px] text-slate-600 font-mono">
                <span>Lua 5.1 Environment</span>
                <span>UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Features / Peran Penting --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-grow"></div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Core Features</h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              color="from-purple-500 to-indigo-500"
              icon={Ghost}
              title="Custom Virtual Machine"
              desc="Mengubah kode asli Anda menjadi bytecode yang hanya bisa dibaca oleh VM kustom Prometheus. Decompiler biasa akan gagal total."
            />
            <FeatureCard 
              color="from-pink-500 to-rose-500"
              icon={Shield}
              title="Anti-Tamper Runtime"
              desc="Script akan menghancurkan dirinya sendiri (crash) jika mendeteksi upaya debugging, hook, atau perubahan variabel saat berjalan."
            />
            <FeatureCard 
              color="from-blue-500 to-cyan-500"
              icon={Cpu}
              title="Polymorphic Encryption"
              desc="Setiap string dan angka dienkripsi dengan kunci yang berubah-ubah (dinamis) setiap kali Anda melakukan obfuscate."
            />
          </div>
        </div>

        {/* --- Footer --- */}
        <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5">
          <p>&copy; 2025 Prometheus Obfuscator. High Performance Lua Security.</p>
        </footer>

      </main>
    </div>
  );
}