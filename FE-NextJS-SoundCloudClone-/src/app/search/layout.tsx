
import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import type { Metadata } from 'next'
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Tiêu đề from layout',
  description: 'miêu tả layout',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
    </>
  );
}
