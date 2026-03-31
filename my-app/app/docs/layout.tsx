import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Claude src - file docs",
  description: "Per-file documentation and source for claude/src",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-full bg-background text-foreground font-sans">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(16,35,63,0.14),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(141,183,255,0.18),transparent_58%)]" />
      <div className="absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(250,204,21,0.08),transparent_70%)]" />
      <header className="sticky top-0 z-40 w-full border-b border-white/60 bg-[rgba(250,246,238,0.82)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(8,15,28,0.72)]">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/docs/claude-src"
            className="group flex items-center gap-3 text-base font-semibold tracking-tight transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(16,35,63,0.18)] transition-transform group-hover:scale-[1.03] dark:shadow-[0_12px_24px_rgba(0,0,0,0.28)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z" />
              </svg>
            </div>
            <div>
              <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">Docs</span>
              <span className="block text-base text-zinc-950 dark:text-slate-100">Claude Explorer</span>
            </div>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium sm:gap-6">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-zinc-600 transition-colors hover:bg-white/80 hover:text-zinc-950 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/docs/claude-src"
              className="rounded-full bg-white/80 px-3 py-2 text-zinc-950 shadow-sm ring-1 ring-white/80 transition-colors hover:bg-white dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/14"
            >
              Overview
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
