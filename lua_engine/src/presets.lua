-- This Script is Part of the Prometheus Obfuscator by Levno_710
--
-- presets.lua
-- OPTIMIZED FOR MOBILE EXECUTORS (Delta/Fluxus/Arceus)

return {
    ["Minify"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        Steps = {
            { Name = "Watermark"; Settings = { Content = "Protected By HakutakaID"; CustomVariable = "_HAKUTAKAID"; }; },
            { Name = "Vmify"; Settings = { }; },
        }
    };

    ["Weak"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        Steps = {
            { Name = "Vmify"; Settings = { }; },
            { Name = "ConstantArray"; Settings = { Treshold = 1; StringsOnly = true; } },
        }
    };

    ["Medium"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        Steps = {
            { Name = "EncryptStrings"; Settings = { }; },
            { Name = "Vmify"; Settings = { }; },
            { Name = "ConstantArray"; Settings = { Treshold = 1; StringsOnly = true; Shuffle = true; Rotate = true; } },
        }
    };

    ["Strong"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        Steps = {
            { Name = "Watermark"; Settings = { Content = "HakutakaID"; CustomVariable = "_HKT"; }; },
            { Name = "EncryptStrings"; Settings = { }; },
            -- Menggunakan Table Concatenation (Lebih hemat memori daripada Inline)
            { Name = "SplitStrings"; Settings = { Treshold = 1; MinLength = 10; MaxLength = 50; ConcatenationType = "table"; }; },
            { Name = "ConstantArray"; Settings = { Treshold = 1; StringsOnly = true; Shuffle = true; Rotate = true; } },
            { Name = "Vmify"; Settings = { }; },
        }
    };

    ["MaxStrong"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        Steps = {
            { Name = "Watermark"; Settings = { Content = "HakutakaID"; }; },
            { Name = "AntiTamper"; Settings = { UseDebug = false; }; },
            -- Ganti ke 'local' function agar ukuran file tidak meledak
            { 
                Name = "SplitStrings";
                Settings = { 
                    Treshold = 1;
                    MinLength = 5; 
                    MaxLength = 30; 
                    ConcatenationType = "custom"; 
                    CustomFunctionType = "local"; -- PENTING: Gunakan 'local' bukan 'inline'
                    CustomLocalFunctionsCount = 2;
                };
            },
            { Name = "EncryptStrings"; Settings = { }; },
            { Name = "NumbersToExpressions"; Settings = { Treshold = 0.5; InternalTreshold = 0.5; } }, -- Dikurangi ke 50%
            { Name = "ConstantArray"; Settings = { Treshold = 1; StringsOnly = true; Shuffle = true; Rotate = true; } },
            { Name = "Vmify"; Settings = { }; },
        }
    };

    -- PROFIL HUSUS HP / DELTA (Safe Mode)
    ["InsaneMode"] = {
        LuaVersion = "LuaU";
        VarNamePrefix = "";
        NameGenerator = "MangledShuffled";
        PrettyPrint = false;
        Seed = 0;
        
        Steps = {
            { Name = "Watermark"; Settings = { Content = "HakutakaID - Insane"; CustomVariable = "_GOD"; }; },
            { Name = "AntiTamper"; Settings = { UseDebug = false; }; },
            
            -- OPTIMASI: Jangan pakai inline split strings di InsaneMode HP
            -- Kita pakai table concat yang jauh lebih stabil untuk script panjang
            { 
                Name = "SplitStrings";
                Settings = { 
                    Treshold = 1;
                    MinLength = 10; 
                    MaxLength = 100; 
                    ConcatenationType = "table"; 
                };
            },
            
            { Name = "EncryptStrings"; Settings = { }; },
            { Name = "AddVararg"; Settings = { } },            
            
            -- OPTIMASI: Kurangi rekursi angka agar VM tidak crash
            { 
                Name = "NumbersToExpressions";
                Settings = { 
                    Treshold = 0.8;
                    InternalTreshold = 0.3; 
                } 
            },

            { 
                Name = "ConstantArray";
                Settings = { 
                    Treshold = 1;
                    StringsOnly = true;
                    Shuffle = true;
                    Rotate = true;
                } 
            },

            -- Virtual Machine
            { Name = "Vmify"; Settings = { }; },

            -- Layering cukup 1 kali untuk HP agar tidak timeout
            { Name = "WrapInFunction"; Settings = { Iterations = 1; } }, 
        }
    };
}