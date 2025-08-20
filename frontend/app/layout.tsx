import './globals.css';

export const metadata = {
  title: 'Volunteer Yatra',
  description: 'Find volunteering opportunities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
