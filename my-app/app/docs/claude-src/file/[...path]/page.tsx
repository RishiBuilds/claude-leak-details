import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  loadManifest,
  readSrcPreview,
  safeResolveSrcFile,
  type ClaudeSrcFileEntry,
} from "@/lib/claudeSrc";

type Props = {
  params: Promise<{ path?: string[] }>;
};

function entryForPath(files: ClaudeSrcFileEntry[], posix: string): ClaudeSrcFileEntry | undefined {
  return files.find((f) => f.path === posix);
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-bold text-zinc-950 dark:text-slate-50">{value}</p>
    </div>
  );
}

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,250,242,0.9))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,26,45,0.92),rgba(10,18,33,0.92))]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-slate-50">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path: segments } = await params;
  if (!segments?.length) return { title: "File - claude/src" };
  const posix = segments.map((s) => decodeURIComponent(s)).join("/");
  return { title: `${posix} - claude/src` };
}

export default async function ClaudeSrcFilePage({ params }: Props) {
  const { path: segments } = await params;
  if (!segments?.length) notFound();

  const posix = segments.map((s) => decodeURIComponent(s)).join("/");
  const full = safeResolveSrcFile(posix);
  if (!full) notFound();

  const manifest = await loadManifest();
  const meta = entryForPath(manifest.files, posix);
  if (!meta) notFound();

  let preview: { content: string; truncated: boolean; encoding: "utf8" } | null = null;
  if (meta.isText) {
    try {
      preview = await readSrcPreview(full);
    } catch {
      preview = null;
    }
  }

  return (
    <article className="mx-auto max-w-6xl space-y-10 pb-16">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,250,242,0.9))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,26,45,0.92),rgba(10,18,33,0.92))]">
        <div className="space-y-6">
          <Link
            href="/docs/claude-src"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm ring-1 ring-zinc-200 transition-colors hover:text-zinc-950 dark:bg-white/8 dark:text-slate-300 dark:ring-white/10 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
            </svg>
            Back to repository
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-[#f7f1e7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-300">
              File detail
            </div>
            <h1 className="break-all font-mono text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl dark:text-slate-50">
              {meta.path}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-slate-300">
              Review generated context, inspect structural hints, and read the latest UTF-8 preview for this path inside the explorer.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Extension" value={meta.ext || "no ext"} />
            <StatCard label="Line count" value={`${meta.lineCount.toLocaleString()} lines`} />
            <StatCard label="File size" value={`${meta.size.toLocaleString()} bytes`} />
            <StatCard label="Preview mode" value={meta.isText ? "Text preview" : "Binary or disabled"} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <SectionCard eyebrow="Purpose" title="Use case">
          <p className="text-sm leading-7 text-zinc-700 dark:text-slate-300">{meta.useCase || "No use-case hint was generated for this file."}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-slate-500">
            Generated heuristically and may need manual verification.
          </p>
        </SectionCard>

        <SectionCard eyebrow="Summary" title="Inline overview">
          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-700 dark:text-slate-300">
            {meta.summary || "No summary provided."}
          </p>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Surface area" title="Exports">
          {meta.exports.length > 0 ? (
            <ul className="flex flex-wrap gap-2 text-sm">
              {meta.exports.map((name) => (
                <li key={name} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-slate-200">
                  <code className="font-mono text-xs">{name}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-7 text-zinc-600 dark:text-slate-300">No exported symbols were detected heuristically for this file.</p>
          )}
        </SectionCard>

        <SectionCard eyebrow="Dependencies" title="External import roots">
          {meta.importRoots.length > 0 ? (
            <>
              <p className="mb-4 text-sm leading-7 text-zinc-600 dark:text-slate-300">Package roots detected from <code>from &quot;...&quot;</code> style imports.</p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {meta.importRoots.map((p) => (
                  <li key={p} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-slate-200">
                    <code className="font-mono text-xs">{p}</code>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm leading-7 text-zinc-600 dark:text-slate-300">No external import roots were detected for this file.</p>
          )}
        </SectionCard>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#f7f1e7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-600 dark:bg-white/8 dark:text-slate-300">
            Source preview
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#d8cfbe] to-transparent dark:from-white/10" />
        </div>

        {!meta.isText ? (
          <div className="rounded-[2rem] border border-zinc-200 bg-[#fbf8f1] p-10 text-center text-sm text-zinc-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            Binary or non-text type. No UTF-8 preview is available for this file.
          </div>
        ) : !preview ? (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-sm text-rose-700 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
            The file metadata was found, but the preview could not be read from disk.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[2rem] border border-[#17263f] bg-[#0f172a] shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#111c31] px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400/70" />
                <div className="h-3 w-3 rounded-full bg-amber-300/70" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                <span>{meta.path.split("/").pop()}</span>
                <span>{preview.encoding}</span>
              </div>
            </div>

            {preview.truncated && (
              <div className="border-b border-white/10 bg-[rgba(59,130,246,0.12)] px-5 py-3 text-xs font-medium text-blue-200">
                Preview truncated to roughly 400 KB. Open the local file for the complete source.
              </div>
            )}

            <pre className="max-h-[min(72vh,960px)] overflow-auto p-5 font-mono text-[13px] leading-7 text-slate-200">
              {preview.content}
            </pre>
          </div>
        )}
      </section>
    </article>
  );
}
