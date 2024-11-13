import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Defina o peso correto se a fonte Poppins tiver opções específicas, como "400" para regular e "700" para bold
const poppins = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400 900", // Ajuste este valor conforme necessário
});

export const metadata: Metadata = {
  title: "Taskly!",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
