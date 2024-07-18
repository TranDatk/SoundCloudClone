import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { TrackContextProvider } from '@/lib/track.wrapper';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import NProgressWrapper from '@/lib/nprgress.wrapper';
import { ToastProvider } from '@/utils/toast';
import '@/app/styles/globals.scss'
import { UserContextProvider } from '@/lib/user.wrapper';

const DRAWER_WIDTH = 240;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dns = require('dns');
  dns.setDefaultResultOrder('ipv4first');
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NProgressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>
                  <UserContextProvider>
                    {children}
                  </UserContextProvider>
                </TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
