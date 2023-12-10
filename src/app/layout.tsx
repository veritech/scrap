import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationMenu from './components/navigation_menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationMenu />
        <div className='flex font-sans p-4'>
          {children}
        </div>
      </body>
    </html>
  )
}
