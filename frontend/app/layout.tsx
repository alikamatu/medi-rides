import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Our Services - Compassionate Medi Rides | Medical Transportation',
  description: 'Professional non-emergency medical and personal transportation services. Doctor appointments, dialysis, airport transfers, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}