import { IBM_Plex_Mono } from 'next/font/google';

export const MonoFont = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});
