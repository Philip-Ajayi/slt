import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salt and Light Conference 2025 Registration',
  description: 'The convocation of and for influence in the World mountains',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <main>{children}</main>
      </body>
    </html>
  );
}
