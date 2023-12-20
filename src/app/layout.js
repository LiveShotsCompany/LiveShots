import "./globals.css";
export const metadata = {
  title: "LiveShots",
  description: "LiveShots",
};
export default function RootLayout({ children }) {
  return (
    <html className="h-screen">
      <body className="h-full">{children}</body>
    </html>
  );
}
