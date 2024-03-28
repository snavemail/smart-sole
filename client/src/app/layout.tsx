import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';
import React from 'react';

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-zenKakuGothicNew'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
});

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'Ask and answer all your programming questions',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zenKakuGothicNew.variable} ${inter.variable} ${spaceGrotesk.variable} `}
      >
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
