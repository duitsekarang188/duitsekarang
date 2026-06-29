import "./globals.css";

export const metadata = {
  title: "DuitSekarang - Borang Saringan Digital (e-KYC)",
  description: "Saringan kelayakan kredit pantas dan selamat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body>
        {children}
      </body>
    </html>
  );
}