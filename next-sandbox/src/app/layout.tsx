import '@/styles/globals.css'

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}