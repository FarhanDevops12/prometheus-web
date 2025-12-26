sudo apt-get install -y make musl musl-tools gcc-mingw-w64
vercel deploy
vercel deploy --prebuilt
vercel --prod
# Masuk ke folder bin
cd lua_engine/bin

# Hapus binary yang crash tadi
rm lua5.1

# Download binary baru (Lua 5.1 Linux x64 dari ZeroBraneStudio)
wget -O lua5.1 https://github.com/pkulchenko/ZeroBraneStudio/raw/master/bin/linux/x64/lua

# Beri izin eksekusi (chmod)
chmod +x lua5.1

# Kembali ke root project
cd ../..