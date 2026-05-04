import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farzan F A — Site Reliability Engineer",
  description:
    "I think, then I build. Site Reliability Engineer with 2+ years of DevOps experience across AWS, Kubernetes, and CI/CD.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts loaded via <link> (not next/font/google) so the build doesn't need internet access */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200..900&family=Noto+Sans:wght@100..900&family=Courier+Prime:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=psychiatry,sunny"
        />
        <link rel="preload" href="/mac-folder-back-opt.svg" as="image" />
        <link rel="preload" href="/mac-folder-front-opt.svg" as="image" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
