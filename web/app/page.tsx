"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/ML_NonRepainting_Indicator.pine", { cache: "no-store" });
        setCode(await res.text());
      } catch {
        setCode("// Failed to load Pine Script. Please try again.");
      }
    };
    load();
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          ML Non-Repainting Indicator for TradingView (Pine v5)
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Copy the code below and paste it into a new indicator in TradingView. Adjust settings inside TradingView.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onCopy}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {copied ? "Copied" : "Copy Code"}
          </button>
          <a
            href="/ML_NonRepainting_Indicator.pine"
            download
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Download .pine
          </a>
        </div>

        <pre className="mt-6 max-h-[70vh] overflow-auto rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          <code>{code}</code>
        </pre>
      </main>
    </div>
  );
}
