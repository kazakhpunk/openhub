import { Toaster } from 'sonner';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reasoning Example',
  description: 'Reasoning chat example.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body><Toaster />{children}</body>
    </html>
  );
}
