import type { Metadata } from "next";
import { ThemeToggle } from "./ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Leak Details Explorer",
  description: "Documentation explorer for the claude/src codebase",
};

const themeScript = `
(() => {
  try {
    const storageKey = "theme-preference";
    const stored = window.localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans transition-colors duration-200">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeToggle />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border/80 bg-background/70 py-6 text-center text-sm text-muted-foreground backdrop-blur">
          <p>
            Built by{" "}
            <a
              href="https://x.com/KingRishi2005"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground/60"
            >
              Rishi
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
