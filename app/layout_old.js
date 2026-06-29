import './globals.css';

export const metadata = {
  title: 'DuitSekarang - Pembiayaan Digital Pantas',
  description: 'Sistem permohonan pembiayaan digital 24 jam',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <body>
        {children}
      </body>
    </html>
  )
}