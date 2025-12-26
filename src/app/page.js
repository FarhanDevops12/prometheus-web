'use client';
import { useState, useEffect } from 'react';
import { Upload, FileCode, CheckCircle, AlertCircle, Copy, Terminal, Play, Loader2, X } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const presets = ['Minify', 'Weak', 'Medium', 'Strong', 'MaxStrong', 'InsaneMode'];

  // Handle Drag & Drop Animation
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("⚠️ Harap pilih file script Lua terlebih dahulu!");
    
    setLoading(true);
    setError('');
    setOutput('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('preset', preset);

    try {
      const req = await fetch('/api/obfuscate', {
        method: 'POST',
        body: formData,
      });
      const res = await req.json();

      if (req.ok) {
        setOutput(res.code);
      } else {
        setError(res.details || res.error || "Gagal memproses script.");
      }
    } catch (err) {
      setError("Gagal menghubungi server. Periksa koneksi internet Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative">
      
      {/* --- Animated Background Glows --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* --- Header Section --- */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-400 mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Lua 5.1 Engine Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            Prometheus
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Platform obfuscator Lua tingkat lanjut untuk mengamankan kode Anda. 
            <span className="block md:inline text-slate-500 mt-2 md:mt-0"> Didukung oleh infrastruktur cloud modern.</span>
          </p>
        </header>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Controls (Glassmorphism) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              
              {/* Decorative Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                Konfigurasi
              </h2>
              
              <div className="space-y-6">
                
                {/* 1. Drag & Drop Zone */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Script Source</label>
                  <div 
                    className={`relative group border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center
                      ${dragActive 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5 bg-black/20'
                      }
                      ${file ? 'border-green-500/50 bg-green-500/5' : ''}
                    `}
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  >
                    <input 
                      type="file" 
                      accept=".lua,.txt"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {file ? (
                      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                          <FileCode className="w-6 h-6 text-green-400" />
                        </div>
                        <p className="text-sm font-medium text-green-400 truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                        <button 
                          onClick={(e) => {e.stopPropagation(); setFile(null)}}
                          className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 z-20"
                        >
                          <X className="w-3 h-3" /> Hapus File
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-slate-400 group-hover:text-white" />
                        </div>
                        <p className="text-sm text-slate-300">Klik atau seret file Lua ke sini</p>
                        <p className="text-xs text-slate-600 mt-1">Mendukung .lua dan .txt</p>
                      </>
                    )}
                  </div>
                </div>

                {/* 2. Preset Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Tingkat Keamanan</label>
                  <div className="relative">
                    <select 
                      value={preset}
                      onChange={(e) => setPreset(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none text-slate-200 transition-shadow"
                    >
                      {presets.map(p => <option key={p} value={p} className="bg-slate-900">{p}</option>)}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {preset === 'InsaneMode' && (
                    <div className="mt-3 flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-400/90 leading-relaxed">
                        Mode <strong>Insane</strong> sangat berat. Proses mungkin memakan waktu hingga 10-15 detik di server.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button 
                  onClick={handleUpload}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    ${loading 
                      ? 'bg-slate-800 text-slate-400' 
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 hover:shadow-purple-500/25 text-white'
                    }`}
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> MEMPROSES...</>
                  ) : (
                    <><Play className="w-5 h-5 fill-current" /> JALANKAN PROMETHEUS</>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-red-400">Terjadi Kesalahan</h4>
                    <p className="text-xs text-red-300/80 font-mono whitespace-pre-wrap">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Output (Code Editor Look) */}
          <div className="lg:col-span-7 h-full min-h-[500px] flex flex-col">
            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl flex flex-col flex-grow overflow-hidden ring-1 ring-white/5 relative">
              
              {/* Fake Browser/Editor Header */}
              <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                  <FileCode className="w-3 h-3" />
                  output.lua
                </div>
                {output && (
                  <button 
                    onClick={() => {navigator.clipboard.writeText(output); alert("Berhasil disalin!")}}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors border border-white/5"
                  >
                    <Copy className="w-3 h-3" /> Salin
                  </button>
                )}
              </div>

              {/* Code Area */}
              <div className="relative flex-grow">
                {!output && !loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 pointer-events-none">
                    <Terminal className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-sm font-medium opacity-40">Menunggu output...</p>
                  </div>
                )}
                
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-20">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <p className="mt-6 text-sm font-medium text-purple-300 animate-pulse">Sedang mengunyah kode Lua...</p>
                  </div>
                )}

                <textarea 
                  readOnly 
                  value={output} 
                  spellCheck="false"
                  className="w-full h-full bg-transparent p-6 font-mono text-sm text-green-400/90 resize-none focus:outline-none leading-6 selection:bg-green-900/30"
                  placeholder=""
                />
              </div>

              {/* Status Bar */}
              <div className="bg-black/40 border-t border-white/5 px-4 py-2 flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase tracking-wider">
                <span>Ln {output.split('\n').length}, Col 1</span>
                <span>UTF-8</span>
                <span>Lua 5.1</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}