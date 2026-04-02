import Link from "next/link";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 98 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const githubHref = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/RishiBuilds/claude-leak-details";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.15),transparent_55%)]" />
      <div className="animate-float absolute right-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(34,211,238,0.1),transparent_70%)]" />
      <div className="animate-float absolute left-[-10rem] top-40 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.14),transparent_70%)] blur-3xl [animation-delay:1s] dark:bg-[radial-gradient(circle,rgba(45,212,191,0.12),transparent_70%)]" />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 sm:px-8 lg:min-h-[calc(100vh-5.75rem)] lg:px-10 lg:py-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.78fr)] lg:items-center lg:gap-8">
          <section className="space-y-8 lg:space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-teal-200/60 bg-gradient-to-r from-teal-50/90 to-cyan-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-900 shadow-[0_20px_60px_rgba(20,184,166,0.12)] backdrop-blur transition-all hover:shadow-[0_20px_60px_rgba(20,184,166,0.18)] dark:border-teal-500/20 dark:from-teal-950/40 dark:to-cyan-950/40 dark:text-teal-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500 shadow-[0_0_0_4px_rgba(20,184,166,0.2)]" />
              Documentation Explorer
            </div>

            <div className="space-y-5 lg:space-y-4">
              <h1 className="max-w-3xl bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-6xl xl:text-7xl dark:from-slate-50 dark:via-teal-100 dark:to-slate-200">
                Navigate <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">claude/src</span> with a sharper UI.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl lg:max-w-xl lg:text-lg lg:leading-7 dark:text-slate-400">
                Browse generated documentation, exports, dependency hints, and live source previews in a cleaner
                workspace built for fast code reading.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs/claude-src"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(20,184,166,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(20,184,166,0.4)] dark:from-teal-500 dark:to-cyan-500"
              >
                Open Explorer
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10"
              >
                <GitHubIcon className="h-4 w-4" />
                View GitHub
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:gap-3">
              <div className="group rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/50 p-5 shadow-[0_18px_40px_rgba(20,184,166,0.08)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] lg:p-4 dark:border-teal-900/30 dark:from-slate-900/50 dark:to-teal-950/30">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-400">Readable</p>
                <p className="mt-3 text-lg font-semibold text-zinc-950 lg:mt-2 lg:text-base dark:text-slate-50">Source preview tuned for long files</p>
              </div>
              <div className="group rounded-3xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/50 p-5 shadow-[0_18px_40px_rgba(6,182,212,0.08)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] lg:p-4 dark:border-cyan-900/30 dark:from-slate-900/50 dark:to-cyan-950/30">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">Explorable</p>
                <p className="mt-3 text-lg font-semibold text-zinc-950 lg:mt-2 lg:text-base dark:text-slate-50">Folder-aware browsing with fast filtering</p>
              </div>
              <div className="group rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-5 shadow-[0_18px_40px_rgba(14,165,233,0.08)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)] lg:p-4 dark:border-sky-900/30 dark:from-slate-900/50 dark:to-sky-950/30">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">Contextual</p>
                <p className="mt-3 text-lg font-semibold text-zinc-950 lg:mt-2 lg:text-base dark:text-slate-50">Summaries, exports, and import hints inline</p>
              </div>
            </div>
          </section>

          <aside className="relative overflow-hidden rounded-[2rem] border border-teal-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(240,253,250,0.92))] p-6 shadow-[0_26px_80px_rgba(20,184,166,0.15)] backdrop-blur lg:p-5 dark:border-teal-900/30 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(10,18,33,0.92))]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
            <div className="space-y-6 lg:space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">Included views</p>
                  <h2 className="mt-2 bg-gradient-to-br from-zinc-950 to-zinc-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent lg:text-[2rem] dark:from-slate-50 dark:to-slate-300">Designed for inspection</h2>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg">
                  New UI
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-teal-100 bg-white/95 p-5 lg:p-4 dark:border-teal-900/30 dark:bg-white/5">
                <p className="text-sm font-semibold text-zinc-950 dark:text-slate-50">What you can scan quickly</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    "Generated file summaries",
                    "Export and import surfaces",
                    "Line counts and file size stats",
                    "Truncated source previews",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-all hover:from-teal-100 hover:to-cyan-100 lg:px-3 lg:py-2.5 dark:from-teal-950/40 dark:to-cyan-950/40 dark:text-slate-200 dark:hover:from-teal-900/50 dark:hover:to-cyan-900/50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-bold text-white shadow-md">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 p-5 text-white shadow-xl lg:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-100">Start here</p>
                <p className="mt-3 text-lg font-semibold lg:mt-2 lg:text-[1.05rem]">Open the explorer and jump straight into the repo map.</p>
                <p className="mt-2 text-sm leading-6 text-teal-100 lg:leading-5">
                  The experience now matches the depth of the generated docs instead of feeling like a placeholder.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
