"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

export type ListRow = { path: string; ext: string; lineCount: number; useCase: string };

export function FileListClient({
  rows,
  byFolder,
}: {
  rows: ListRow[];
  byFolder: Record<string, ListRow[]>;
}) {
  const [q, setQ] = useState("");
  const [folder, setFolder] = useState<string | "all">("all");
  const deferredQ = useDeferredValue(q);

  const folders = useMemo(() => Object.keys(byFolder).sort(), [byFolder]);

  const filtered = useMemo(() => {
    const needle = deferredQ.trim().toLowerCase();
    const pool = folder === "all" ? rows : byFolder[folder] ?? [];
    if (!needle) return pool;
    return pool.filter((r) => r.path.toLowerCase().includes(needle));
  }, [deferredQ, folder, rows, byFolder]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,250,242,0.9))] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,26,45,0.92),rgba(10,18,33,0.92))]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">Filter path</span>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/8">
              <svg className="h-4 w-4 text-zinc-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by path, feature, or filename"
                className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              {q ? (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/14 dark:hover:text-white"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">Top folder</span>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value as typeof folder)}
              className="w-full cursor-pointer rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-colors focus:border-accent dark:border-white/10 dark:bg-white/8 dark:text-slate-100"
            >
              <option value="all">All folders ({rows.length})</option>
              {folders.map((f) => (
                <option key={f} value={f}>
                  {f}/ ({byFolder[f]?.length ?? 0})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-4 dark:border-white/10">
          <p className="text-sm font-medium text-zinc-600 dark:text-slate-300">
            Showing <span className="font-semibold text-zinc-950 dark:text-slate-100">{filtered.length}</span> of {rows.length} files
          </p>
          <div className="flex flex-wrap gap-2">
            {folders.slice(0, 6).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setFolder(name)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  folder === name ? "bg-primary text-primary-foreground" : "bg-white text-zinc-600 ring-1 ring-zinc-200 dark:bg-white/8 dark:text-slate-300 dark:ring-white/10"
                }`}
              >
                {name}
              </button>
            ))}
            {folder !== "all" ? (
              <button
                type="button"
                onClick={() => setFolder("all")}
                className="rounded-full bg-[#f5efe3] px-3 py-1.5 text-xs font-semibold text-zinc-700 ring-1 ring-[#e4d8c1] dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
              >
                Reset folder
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-white/60 backdrop-blur dark:border-white/10 dark:bg-white/6 dark:ring-white/10">
        <ul className="max-h-[70vh] space-y-0 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-[#fbf8f1] p-10 text-center text-sm text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              No files found matching your current query.
            </li>
          ) : (
            filtered.map((r) => (
              <li key={r.path} className="group">
                <Link
                  title={r.useCase.slice(0, 500)}
                  href={`/docs/claude-src/file/${r.path
                    .split("/")
                    .map((seg) => encodeURIComponent(seg))
                    .join("/")}`}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-transparent px-4 py-4 transition-all hover:border-[#e6dac7] hover:bg-[#f8f4ec] sm:px-5 dark:hover:border-white/10 dark:hover:bg-white/6"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                      <p className="break-all font-mono text-[13px] font-semibold text-zinc-800 transition-colors group-hover:text-accent dark:text-slate-100">
                        {r.path}
                      </p>
                      <p className="max-w-3xl text-sm leading-6 text-zinc-600 line-clamp-2 dark:text-slate-300">
                        {r.useCase || "Open this file to inspect its generated summary and source preview."}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-500 dark:text-slate-400">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 font-semibold text-zinc-700 ring-1 ring-zinc-200 dark:bg-white/8 dark:text-slate-200 dark:ring-white/10">
                        {r.ext || "no-ext"}
                      </span>
                      <span className="rounded-full bg-[#f5efe3] px-3 py-1.5 font-semibold text-zinc-700 ring-1 ring-[#e4d8c1] dark:bg-white/10 dark:text-slate-200 dark:ring-white/10">
                        {r.lineCount.toLocaleString()} lines
                      </span>
                      <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:translate-x-0.5 sm:inline-flex">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
