// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartClean",
  description: "Book trusted cleaners & nannies by zone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="font-bold text-xl text-brand-700">
              SmartClean
            </Link>
            <nav className="text-sm text-slate-600 flex gap-4">
              <Link href="/(public)/login">Login</Link>
              <Link href="/(public)/register">Register</Link>
              <Link href="/(client)/search">Find a Cleaner</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t bg-white text-center py-4 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SmartClean. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
