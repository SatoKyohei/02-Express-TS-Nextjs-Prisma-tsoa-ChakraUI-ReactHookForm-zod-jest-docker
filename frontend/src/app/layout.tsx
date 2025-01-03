import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Provider } from "@/components/ui/provider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={notoSansJP.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
