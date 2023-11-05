import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { cookies } from 'next/headers';
import { ClientCookiesProvider } from '@/components/provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Portal',
  description: 'This is Job Portal management website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-background ${inter.className}`}>
      <ClientCookiesProvider value={cookies().getAll()}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
        </ThemeProvider>
        </ClientCookiesProvider>
        <Toaster />
      </body>
    </html>
  )
}
