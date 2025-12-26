'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileCode, Terminal, Play, Loader2, X, Copy, 
  ShieldCheck, Cpu, Zap, Lock, ChevronRight, Check
} from 'lucide-react';

// --- Komponen Fitur (Peran Penting) ---
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
  >
    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]); // Simulasi log terminal
  const [error, setError] = useState('');
  const outputRef = useRef(null);

  const presets = ['Minify', 'Weak', 'Medium', 'Strong', 'MaxStrong', 'InsaneMode'];

  // Fungsi simulasi terminal log
  const addLog = (msg) => setLogs(prev => [...prev, msg]);

  const handleUpload = async () => {
    if (!file) return setError("⚠️ Pilih file script Lua terlebih dahulu!");
    
    setLoading(true);
    setError('');
    setOutput('');
    setLogs([]);

    // Simulasi Logs Awal
    addLog("> Initializing Prometheus Engine...");
    addLog(`> Loading preset: ${preset}`);
    addLog("> Uploading payload...");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('preset', preset);

    try {
      // Simulasi delay sedikit biar terlihat "mikir"
      setTimeout(() => addLog("> Analyzing Abstract Syntax Tree (AST)..."), 800);
      setTimeout(() => addLog("> Applying Virtual Machine transformation..."), 1500);
      setTimeout(() => addLog("> Encrypting constant strings..."), 2200);

      const req = await fetch('/api/obfuscate', {
        method: 'POST',
        body: formData,
      });
      const res = await req.json();

      if (req.ok) {
        addLog("> Finalizing obfuscation...");
        addLog("> SUCCESS: Code generated.");
        setOutput(res.code);
        // Auto scroll ke output
        setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth' }), 500);
      } else {
        throw new Error(res.details || res.error);
      }
    } catch (err) {
      setError(err.message || "Gagal menghubungi server.");
      addLog(`> ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* --- Navbar Sederhana --- */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            PROMETHEUS
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">API</span>
            <span className="text-purple-400">v2.0 Beta</span>
          </div>
        </nav>

        {/* --- Hero Section --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Lua 5.1 Native Engine Online
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500 mb-6"
          >
            Amankan Kode Lua Anda<br/>Tanpa Kompromi.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Obfuscator Lua 5.1 tingkat lanjut dengan teknologi 
            <span className="text-purple-400 font-semibold"> Virtualization (VM)</span>, 
            enkripsi string dinamis, dan perlindungan anti-tamper.
          </motion.p>
        </div>

        {/* --- Main Interface --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* LEFT: Controller */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#0F0F12] border border-white/10 p-1 rounded-3xl shadow-2xl">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[20px] border border-white/5">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  Control Panel
                </h2>

                {/* 1. Upload */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Target File</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept=".lua,.txt"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className={`
                      border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center
                      ${file ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 bg-black/20 group-hover:border-white/20'}
                    `}>
                      {file ? (
                        <>
                          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-purple-500/20">
                            <FileCode className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</p>
                          <p className="text-xs text-purple-300 mt-1">{(file.size/1024).toFixed(1)} KB</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-500 mb-3 group-hover:text-white transition-colors" />
                          <p className="text-sm text-slate-300">Drop script Lua disini</p>
                          <p className="text-xs text-slate-600 mt-1">Supports .lua & .txt</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Preset */}
                <div className="mb-8">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Security Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPreset(p)}
                        className={`text-sm py-2.5 px-4 rounded-lg font-medium transition-all text-left border ${
                          preset === p 
                          ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' 
                          : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {preset === 'InsaneMode' && (
                    <div className="mt-3 text-xs text-yellow-500 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20 flex gap-2">
                      <Lock className="w-3 h-3 mt-0.5" />
                      Mode Insane menggunakan VM ganda. Proses mungkin memakan waktu 10-20 detik.
                    </div>
                  )}
                </div>

                {/* Action */}
                <button 
                  onClick={handleUpload}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all
                    ${loading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] text-white hover:shadow-purple-500/25'
                    }`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                  {loading ? 'PROCESSING...' : 'INITIATE PROTOCOL'}
                </button>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono">
                    ERROR: {error}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Output / Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-7 flex flex-col h-full min-h-[500px]"
            ref={outputRef}
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col flex-grow overflow-hidden relative group">
              
              {/* Header Editor */}
              <div className="bg-[#151515] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  {loading ? 'compiling...' : output ? 'obfuscated.lua' : 'idle'}
                </div>
                {output && (
                  <button 
                    onClick={() => {navigator.clipboard.writeText(output); alert("Code Copied!")}}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md text-xs text-green-400 border border-green-900/30 transition-colors"
                  >
                    <Copy className="w-3 h-3" /> COPY
                  </button>
                )}
              </div>

              {/* Area Konten */}
              <div className="relative flex-grow bg-[#050505] font-mono text-sm p-4 overflow-auto custom-scrollbar">
                
                {/* State: Idle */}
                {!loading && !output && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                    <Cpu className="w-20 h-20 mb-4 opacity-20" />
                    <p className="text-sm font-medium opacity-40 uppercase tracking-widest">System Ready</p>
                  </div>
                )}

                {/* State: Loading (Terminal Simulation) */}
                {loading && (
                  <div className="space-y-1 font-mono text-xs">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-500/80"
                      >
                        {log}
                      </motion.div>
                    ))}
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
                    />
                  </div>
                )}

                {/* State: Output Result */}
                {!loading && output && (
                  <textarea 
                    readOnly 
                    value={output} 
                    spellCheck="false"
                    className="w-full h-full bg-transparent text-slate-300 resize-none focus:outline-none leading-6 font-mono text-xs"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Features Grid (Peran Penting) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <FeatureCard 
            icon={Cpu}
            delay={0.5}
            title="Custom Virtual Machine"
            desc="Kode Anda dikompilasi menjadi bytecode kustom dan dijalankan oleh VM unik di setiap obfuscation. Mustahil di-decompile secara statis."
          />
          <FeatureCard 
            icon={ShieldCheck}
            delay={0.6}
            title="Anti-Tamper & Debug"
            desc="Sistem deteksi runtime yang mematikan script secara otomatis jika mendeteksi debugger, hook, atau perubahan integritas kode."
          />
          <FeatureCard 
            icon={Lock}
            delay={0.7}
            title="Constant Encryption"
            desc="Semua string dan angka dienkripsi dengan algoritma polimorfik. String sensitif Anda tidak akan terbaca di memori dengan mudah."
          />
        </div>

        {/* --- Footer --- */}
        <footer className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
          <p>© 2025 Prometheus Obfuscator. Powered by Lua 5.1 & Next.js.</p>
        </footer>

      </div>
    </div>
  );
}