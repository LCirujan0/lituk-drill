import type { Metadata, Viewport } from 'next';
import '@/styles/tokens.css';
import './globals.css';

// No webfont, deliberately (D-018). A font round-trip and its layout shift land on the
// exact screen that must feel instant (§G), and the system stack is what the phone
// already renders best.

export const metadata: Metadata = {
  title: 'Life in the UK — drill',
  description: '410 facts, asked several ways. The fact is the scheduling unit, not the question.',
  // Must survive Add to Home Screen: full screen, no address bar (§F).
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Life in the UK' },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
      <body>{children}</body>
    </html>
  );
}
