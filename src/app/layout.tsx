import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/hooks/use-cart';
import { Toaster } from "@/components/ui/toaster"
import { AnimatedBackground } from '@/components/common/AnimatedBackground';

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
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
