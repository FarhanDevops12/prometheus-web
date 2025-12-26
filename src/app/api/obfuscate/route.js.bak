import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const preset = formData.get('preset') || 'Medium';

    if (!file) {
      return NextResponse.json({ error: 'File Lua diperlukan' }, { status: 400 });
    }

    // 1. Setup Path Direktori
    const projectRoot = process.cwd();
    // Folder tempat script Lua kamu berada
    const engineDir = path.join(projectRoot, 'lua_engine');
    // Path ke Binary Lua
    const luaBinary = path.join(engineDir, 'bin', 'lua5.1');

    // Cek apakah binary ada (Debugging Vercel)
    if (!fs.existsSync(luaBinary)) {
        return NextResponse.json({ error: `Binary Lua tidak ditemukan di: ${luaBinary}` }, { status: 500 });
    }

    // Pastikan binary bisa dieksekusi (Linux Permission)
    try { fs.chmodSync(luaBinary, '755'); } catch (e) {}

    // 2. Simpan File User Sementara (Vercel hanya mengizinkan tulis di /tmp)
    const tempDir = os.tmpdir();
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const inputPath = path.join(tempDir, `in_${uniqueId}.lua`);
    const outputPath = path.join(tempDir, `out_${uniqueId}.lua`);

    // Tulis file upload ke /tmp
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(inputPath, buffer);

    // 3. Siapkan Command Lua
    // Format: ./bin/lua5.1 prometheus-main.lua --preset [PRESET] --out [OUTPUT] [INPUT]
    // Kita jalankan DARI DALAM folder lua_engine supaya "require('src...')" jalan
    const args = [
      'prometheus-main.lua',
      '--preset', preset,
      '--Lua51', // Force config Lua 5.1
      '--out', outputPath,
      inputPath
    ];

    console.log(`🚀 Executing: ${luaBinary} ${args.join(' ')}`);

    // 4. Eksekusi Child Process
    await new Promise((resolve, reject) => {
      execFile(luaBinary, args, { 
        cwd: engineDir, // PENTING: Jalankan command seolah-olah kita ada di folder lua_engine
        timeout: 25000  // Timeout 25 detik (Vercel Hobby limit 10s sebenernya, Pro 300s)
      }, (error, stdout, stderr) => {
        if (error) {
          console.error("Lua Error:", stderr || stdout);
          reject(stderr || stdout || error.message);
        } else {
          resolve(stdout);
        }
      });
    });

    // 5. Baca Hasil Output
    if (!fs.existsSync(outputPath)) {
        throw new Error("Output file tidak terbentuk. Cek log error Lua.");
    }
    const result = fs.readFileSync(outputPath, 'utf-8');

    // 6. Bersihkan Sampah
    try { fs.unlinkSync(inputPath); fs.unlinkSync(outputPath); } catch(e) {}

    return NextResponse.json({ success: true, code: result });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan sistem', 
      details: error.toString() 
    }, { status: 500 });
  }
}