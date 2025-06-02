import './globals.css'
import { Providers } from './providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin']});

export const metadata = {
  title: 'Anka Tech',
  description: 'Desafio Anka Tech',
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}