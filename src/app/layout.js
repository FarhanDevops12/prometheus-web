import './globals.css' // <--- WAJIB ADA
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PROMETHEUS | Cyberpunk Obfuscator',
  description: 'Advanced Lua 5.1 Obfuscation Engine',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}