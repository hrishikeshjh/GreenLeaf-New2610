import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/hooks/use-cart';
import { Toaster } from "@/components/ui/toaster"
import { AnimatedBackground } from '@/components/common/AnimatedBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Verdant Vista',
  description: 'An e-commerce website for beautiful plants.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', inter.variable)}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <AnimatedBackground />
            <Header />
            <main className="flex-1 z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
