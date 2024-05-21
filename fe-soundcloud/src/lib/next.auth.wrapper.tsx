'use client'
import { SessionProvider } from 'next-auth/react'

const DRAWER_WIDTH = 240;

export default function NextAuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
