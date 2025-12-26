import os

# Konfigurasi Dasar
ROOT_DIR = "."
OUTPUT_FILE = "all_files.txt"

# --- DAFTAR PENGECUALIAN ---
# Folder yang tidak akan dibuka/discan
EXCLUDED_DIRS = {'.git', '__pycache__', 'node_modules'}

# File yang tidak akan ditulis ke output
# File yang tidak akan ditulis ke output
# Tambahkan 'Readme.md' dan 'data.json' di sini
EXCLUDED_FILES = {'data.json', 'README.md', OUTPUT_FILE, '.DS_Store'}

def merge_files():
    print(f"Mulai menyalin file dari {ROOT_DIR} ke {OUTPUT_FILE}...")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        # os.walk menghasilkan: root (path saat ini), dirs (folder di dalam), files (file di dalam)
        for root, dirs, files in os.walk(ROOT_DIR):
            
            # 1. PENGECUALIAN FOLDER
            # Kita ubah list 'dirs' secara langsung (in-place) agar os.walk TIDAK masuk ke folder ini
            # Ini lebih efisien daripada mengecek path nanti.
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

            for filename in files:
                # 2. PENGECUALIAN FILE
                if filename in EXCLUDED_FILES:
                    continue
                
                # Buat path lengkap
                filepath = os.path.join(root, filename)

                outfile.write(f"\n\n===== FILE: {filepath} =====\n\n")

                try:
                    with open(filepath, "r", encoding="utf-8") as infile:
                        content = infile.read()
                    outfile.write(content)
                    print(f"Berhasil: {filename}")
                except Exception as e:
                    # Menangkap error jika file bukan teks (misal: gambar) atau error izin akses
                    outfile.write(f"[Tidak bisa membaca file ini: {e}]\n")
                    print(f"Gagal membaca: {filename}")

    print("\nSelesai! Semua file berhasil digabungkan.")

if __name__ == "__main__":
    merge_files()