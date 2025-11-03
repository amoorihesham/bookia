import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { ClerkProvider, ThemeProvider } from '@/components/providers';
import './globals.css';
import { Toaster } from 'sonner';

const lato = Lato({
  variable: '--font-lato',
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Bookia',
  description: 'book tickets to events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={`${lato.variable} antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
