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
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/" className="font-bold text-xl text-brand-700">
                SmartClean
              </Link>
              <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <Link href="/(client)/search" className="hover:text-brand-700">
                  Find a cleaner
                </Link>
                <Link href="/(provider)/onboarding" className="hover:text-brand-700">
                  For providers
                </Link>
                <Link href="/(public)/register" className="hover:text-brand-700">
                  Concierge plans
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/(public)/login"
                className="text-slate-600 transition hover:text-brand-700"
              >
                Login
              </Link>
              <Link
                href="/(public)/register"
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-1.5 font-semibold text-brand-700 transition hover:border-brand-300 hover:text-brand-800"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-slate-100/70">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-slate-600">
              <p>Serving Nairobi neighbourhoods: Westlands, Kilimani, Kileleshwa, Lavington, Runda and more.</p>
              <p>
                Need help? <a href="mailto:hello@smartclean.africa" className="font-medium text-brand-700 hover:text-brand-800">hello@smartclean.africa</a>
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white text-center py-4 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SmartClean. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
