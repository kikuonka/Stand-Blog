import './globals.css'
import ClientProvider from './client-provider'

import { Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'JOJO: Stand Blog',
    icons: '/favicon.png',
}

const playfairDisplay = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ru'>
            <body className={`${playfairDisplay.variable} font-playfair antialiased`}>
                <ClientProvider>
                    {children}
                </ClientProvider>
            </body>
        </html>
    )
}
