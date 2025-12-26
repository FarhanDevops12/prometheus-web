import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req) {
  let inputPath = null;
  let outputPath = null;

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const preset = formData.get('preset') || 'Medium';

    if (!file) return NextResponse.json({ error: 'File Lua tidak ditemukan' }, { status: 400 });

    // 1. Setup Path
    const projectRoot = process.cwd();
    const engineDir = path.join(projectRoot, 'lua_engine');
    const luaBinary = path.join(engineDir, 'bin', 'lua5.1');

    // 2. Simpan File Sementara
    const tempDir = os.tmpdir();
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    inputPath = path.join(tempDir, `in_${uniqueId}.lua`);
    outputPath = path.join(tempDir, `out_${uniqueId}.lua`);

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(inputPath, Buffer.from(bytes));

    // Pastikan permission execute (Fix untuk Vercel)
    if (fs.existsSync(luaBinary)) {
        try { fs.chmodSync(luaBinary, '755'); } catch (e) {}
    } else {
        return NextResponse.json({ error: 'Binary Lua hilang dari server!', path: luaBinary }, { status: 500 });
    }

    // 3. Eksekusi Lua
    const args = ['prometheus-main.lua', '--preset', preset, '--Lua51', '--out', outputPath, inputPath];
    
    // Kita bungkus execFile dalam Promise yang menangkap stdout dan stderr
    await new Promise((resolve, reject) => {
      execFile(luaBinary, args, { 
        cwd: engineDir, 
        timeout: 10000 
      }, (error, stdout, stderr) => {
        // Jika error, kita reject dengan pesan yang JELAS
        if (error) {
          // Gabungkan stderr (error lua) dan stdout (log lua)
          const errorLog = stderr || stdout || error.message;
          reject(new Error(errorLog)); 
        } else {
          resolve(stdout);
        }
      });
    });

    // 4. Cek Output
    if (!fs.existsSync(outputPath)) {
        throw new Error("Lua berhasil jalan tapi file output tidak muncul.");
    }
    const result = fs.readFileSync(outputPath, 'utf-8');

    return NextResponse.json({ success: true, code: result });

  } catch (error) {
    console.error("❌ OBSFUCATION ERROR:", error.message);
    
    // Kirim pesan error ASLI dari Lua ke Frontend
    return NextResponse.json({ 
      error: 'Gagal Memproses Script', 
      details: error.message // Ini yang akan muncul di kotak merah website
    }, { status: 500 });

  } finally {
    // Cleanup file sampah
    try { if(inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath); } catch(e) {}
    try { if(outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath); } catch(e) {}
  }
}