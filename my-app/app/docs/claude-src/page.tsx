import type { Metadata } from "next";
import { FileListClient, type ListRow } from "./FileListClient";
import { groupByTopDir, loadManifest } from "@/lib/claudeSrc";

export const metadata: Metadata = {
  title: "All files - claude/src",
};

export default async function ClaudeSrcIndexPage() {
  const manifest = await loadManifest();
  const rows: ListRow[] = manifest.files.map((f) => ({
    path: f.path,
    ext: f.ext,
    lineCount: f.lineCount,
    useCase: f.useCase,
  }));
  const grouped = groupByTopDir(manifest.files);
  const byFolder: Record<string, ListRow[]> = {};
  for (const [dir, files] of grouped) {
    byFolder[dir] = files.map((f) => ({
      path: f.path,
      ext: f.ext,
      lineCount: f.lineCount,
      useCase: f.useCase,
    }));
  }
  const textFiles = manifest.files.filter((f) => f.isText).length;

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,250,242,0.88))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,26,45,0.92),rgba(10,18,33,0.92))]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-300">
              Source inventory
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl dark:text-slate-50">
                Explore every file under{" "}
                <code className="rounded-xl bg-[#f5efe3] px-3 py-1 font-mono text-[0.76em] font-semibold text-zinc-900 ring-1 ring-[#e4d8c1] dark:bg-white/8 dark:text-slate-100 dark:ring-white/10">
                  claude/src
                </code>
              </h1>
              <p className="max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-slate-300">
                Generated manifest at <span className="font-semibold text-zinc-950 dark:text-slate-100">{manifest.generatedAt}</span>. Scan
                summaries, inspect exports, check dependency hints, and jump into a live preview without leaving the docs flow.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-[0_16px_36px_rgba(16,35,63,0.2)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Files</p>
              <p className="mt-2 text-3xl font-bold">{manifest.fileCount.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-white/6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">Folders</p>
              <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-slate-50">{grouped.size.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-white/6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">Text preview</p>
              <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-slate-50">{textFiles.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="text-sm font-semibold text-zinc-950 dark:text-slate-50">Fast filtering</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-slate-300">Search by path and narrow by top-level folder without leaving the list.</p>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="text-sm font-semibold text-zinc-950 dark:text-slate-50">Readable metadata</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-slate-300">Each entry exposes extensions, line counts, and use-case context before you click in.</p>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
          <p className="text-sm font-semibold text-zinc-950 dark:text-slate-50">Detail-first pages</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-slate-300">Open any file to inspect narrative summaries and a styled source preview side by side.</p>
        </div>
      </div>

      <FileListClient rows={rows} byFolder={byFolder} />
    </div>
  );
}
