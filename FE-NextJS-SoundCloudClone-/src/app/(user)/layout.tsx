import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import { Metadata } from 'next';
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Sound Cloud Clone',
  description: '...',
}

const idJsonObject = {
  __html: JSON.stringify({
    "@context": "https://fe-next-js-sound-cloud-clone.vercel.app/",
    "@type": "MusicPlaylist",
    "name": "POP",
    "description": "...",
    "url": "https://fe-next-js-sound-cloud-clone.vercel.app/playlist",
    "image": "https://soundcloudclone-nest.onrender.com/images/namlaydoibantay-1719992176783.jpg",  // URL to the playlist image
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "MusicRecording",
        "position": 1,
        "name": "Track 1",
        "url": "https://fe-next-js-sound-cloud-clone.vercel.app/track/chiec-khan-gio-am-tien-cookie-6684fe9ac52d5614696bd9ab.html",
        "duration": "PT4M18S"
      },
      {
        "@type": "MusicRecording",
        "position": 2,
        "name": "Track 2",
        "url": "https://fe-next-js-sound-cloud-clone.vercel.app/track/nam-doi-ban-tay-kay-tran-66850079c52d5614696bd9ba.html",
        "duration": "PT3M45S"
      },
    ]
  })
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
      <Script type="application/ld+json" dangerouslySetInnerHTML={idJsonObject} />
    </>
  );
}
