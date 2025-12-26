local Ast = require("prometheus.ast")
local utils = require("prometheus.util")
local charset = utils.chararray("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

local function randomString(wordsOrLen)
	if type(wordsOrLen) == "table" then
		return wordsOrLen[math.random(1, #wordsOrLen)];
	end

	-- [PERBAIKAN DIMULAI] 
	-- Cek apakah input BUKAN angka (misalnya boolean true/false atau nil).
	-- Jika bukan angka, paksa jadi angka acak antara 2 sampai 15.
	if type(wordsOrLen) ~= "number" then
		wordsOrLen = math.random(2, 15);
	end
	-- [PERBAIKAN SELESAI]

	if wordsOrLen > 0 then
		return randomString(wordsOrLen - 1) .. charset[math.random(1, #charset)]
	else
		return ""
	end
end

local function randomStringNode(wordsOrLen)
	return Ast.StringExpression(randomString(wordsOrLen))
end

return {
	randomString = randomString,
	randomStringNode = randomStringNode,
}