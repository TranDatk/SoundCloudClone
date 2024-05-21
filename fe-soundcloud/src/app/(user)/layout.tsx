import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';

const DRAWER_WIDTH = 240;

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
