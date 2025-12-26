'use client';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('Medium');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Preset sesuai dengan config.lua kamu
  const presets = ['Minify', 'Weak', 'Medium', 'Strong', 'MaxStrong', 'InsaneMode'];

  const handleUpload = async () => {
    if (!file) return setError("⚠️ Pilih file script Lua dulu!");
    
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
        setError("❌ Error: " + (res.details || res.error));
      }
    } catch (err) {
      setError("❌ Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10 mt-5">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-3">
            PROMETHEUS WEB
          </h1>
          <p className="text-slate-400">Lua 5.1 Obfuscator Service</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* KIRI: Input Panel */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit">
            <h2 className="text-xl font-bold text-blue-400 mb-6">🛠️ Konfigurasi</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">1. Upload Script Lua</label>
                <input 
                  type="file" 
                  accept=".lua,.txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-slate-800 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-300">2. Pilih Preset</label>
                <select 
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 text-slate-200"
                >
                  {presets.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {preset === 'InsaneMode' && <p className="text-xs text-yellow-500 mt-2">⚠️ Preset InsaneMode mungkin memakan waktu lama (Max 10s di paket gratis).</p>}
              </div>

              <button 
                onClick={handleUpload}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  loading 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] text-white'
                }`}
              >
                {loading ? 'Sedang Memproses... ⏳' : 'Obfuscate Sekarang 🚀'}
              </button>

              {error && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm whitespace-pre-wrap">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* KANAN: Output Panel */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col h-[600px] lg:h-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-400">📦 Hasil Output</h2>
              {output && (
                <button 
                  onClick={() => {navigator.clipboard.writeText(output); alert("Salinan berhasil!")}}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded border border-slate-700 transition-colors"
                >
                  Salin Kode
                </button>
              )}
            </div>
            <textarea 
              readOnly 
              value={output} 
              placeholder="Kode hasil obfuscation akan muncul di sini..."
              className="w-full flex-grow bg-black/60 border border-slate-700 rounded-lg p-4 font-mono text-xs text-green-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}