import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';

const DRAWER_WIDTH = 240;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
