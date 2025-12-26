return {
    -- Profil super-strong (ukuran file besar tidak masalah)
    ["SuperUltra"] = {
        -- Target Lua
        LuaVersion = "Lua51";

        -- Buat identifier pendek / acak
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";

        -- Non-aktifkan pretty printing untuk hasil terkompresi (walau langkah berikut akan menambah banyak kode)
        PrettyPrint = false;

        -- 0 = seed acak berdasarkan waktu; ganti dengan angka untuk deterministik
        Seed = 0;

        -- Rangkaian langkah obfuscation (kuat, verbose, menghasilkan file besar)
        Steps = {
            -- Enkripsi semua string literal
            {
                Name = "EncryptStrings";
                Settings = {};
            },

            -- Ekstrak konstanta (bukan hanya string) ke array terpusat + encoding base64 + wrappers lokal
            {
                Name = "ConstantArray";
                Settings = {
                    Treshold               = 1;        -- ekstrak semua konstanta yang ditandai
                    StringsOnly            = false;    -- ekstrak juga angka/nilai konstan lainnya
                    Shuffle                = true;     -- acak urutan
                    Rotate                 = true;     -- tambahkan kode rotate/unrotate (menambah ukuran)
                    LocalWrapperTreshold   = 1;        -- aktifkan wrapper lokal di banyak fungsi
                    LocalWrapperCount      = 6;        -- banyak wrapper lokal per scope
                    LocalWrapperArgCount   = 12;       -- banyak argumen untuk wrapper (kompleksitas)
                    MaxWrapperOffset       = 65535;
                    Encoding               = "base64";
                };
            },

            -- Pecah string kecil2 dan rakit kembali via fungsi custom (inline untuk isi kode besar)
            {
                Name = "SplitStrings";
                Settings = {
                    Treshold = 1;
                    MinLength = 2;
                    MaxLength = 6;
                    ConcatenationType = "custom";
                    CustomFunctionType = "inline";        -- inline membuat file lebih besar tapi sulit dianalisis
                    CustomLocalFunctionsCount = 6;
                };
            },

            -- Proxify locals (metatable/get/set) untuk menambah lapisan keamanan runtime
            {
                Name = "ProxifyLocals";
                Settings = {
                    LiteralType = "any"; -- gunakan berbagai literal untuk kebingungan maksimal
                };
            },

            -- Ubah angka jadi ekspresi (kedalaman tinggi)
            {
                Name = "NumbersToExpressions";
                Settings = {
                    Treshold = 1;            -- ubah semua literal angka
                    InternalTreshold = 0.05; -- eksploitasi ekspresi lebih dalam
                };
            },

            -- Tambahkan vararg ke fungsi (menambah variasi signature)
            {
                Name = "AddVararg";
                Settings = {};
            },

            -- Bungkus skrip beberapa lapis dalam fungsi untuk proteksi scope
            {
                Name = "WrapInFunction";
                Settings = {
                    Iterations = 3;
                };
            },

            -- Tambahkan watermark (optional, tapi berguna untuk identifikasi)
            {
                Name = "Watermark";
                Settings = {
                    Content = "Protected by Prometheus SuperUltra";
                    CustomVariable = "_PROMWATER";
                };
            },

            -- Periksa watermark saat runtime (mengancam untuk mematahkan jika diubah)
            {
                Name = "WatermarkCheck";
                Settings = {
                    Content = "Protected by Prometheus SuperUltra";
                };
            },

            -- Anti-tamper runtime (gunakan debug hooks untuk cek integritas)
            {
                Name = "AntiTamper";
                Settings = {
                    UseDebug = true; -- sangat recommended untuk deteksi tamper, namun butuh library debug
                };
            },

            -- Compile ke VM custom (langkah berat dan membuat file sangat besar, paling kuat)
            {
                Name = "Vmify";
                Settings = {};
            },

            -- Opsional: jalankan Vmify lagi untuk lapis ganda VM (VM dalam VM) — sangat ekstrem
            {
                Name = "Vmify";
                Settings = {};
            },
        };
    }
}