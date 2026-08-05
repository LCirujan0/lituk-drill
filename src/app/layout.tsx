import type { Metadata, Viewport } from 'next';
import { RegisterServiceWorker } from './_lib/register-sw';
import '@/styles/tokens.css';
import './globals.css';

// No webfont, deliberately (D-018). A font round-trip and its layout shift land on the
// exact screen that must feel instant (§G), and the system stack is what the phone
// already renders best.

export const metadata: Metadata = {
  title: 'Life in the UK — drill',
  // No deck size here. HANDOFF owns every live number, and a count restated in shipped
  // metadata is a count that goes stale silently — this one had been wrong since 528.
  description: 'The Life in the UK handbook, asked several ways. The fact is the scheduling unit, not the question.',
  manifest: '/manifest.webmanifest',
  applicationName: 'LITK',
  // Must survive Add to Home Screen: full screen, no address bar (§F). `black-translucent`
  // is what lets the page paint under the status bar; the safe-area insets in globals.css
  // are what keep the content out from under it.
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'LITK' },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
      { url: '/apple-touch-icon-167.png', sizes: '167x167' },
      { url: '/apple-touch-icon-152.png', sizes: '152x152' },
      { url: '/apple-touch-icon-120.png', sizes: '120x120' },
    ],
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No zoom, no pinch. `maximumScale` alone is ignored by iOS Safari in a browser tab, which
  // is correct of it — silently disabling zoom on the web is an accessibility failure. From
  // the Home Screen it is honoured, and there the app is the whole screen and nothing needs
  // magnifying. Type is set in rem against the system size, so the OS text-size setting
  // still works; this only stops the pinch and the double-tap.
  maximumScale: 1,
  userScalable: false,
  // `cover` plus the safe-area insets in globals.css is what keeps content clear of the
  // notch and the home indicator when launched from the Home Screen.
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
