import '@/styles/globals.css'
import { TrpcProvider } from './trpc-provider';

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <TrpcProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </TrpcProvider>
  );
}