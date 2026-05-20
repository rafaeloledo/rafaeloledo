export function Footer() {
  return (
    <footer className="border-t border-base-300 mt-16 relative">
      <div className="chrome-bar" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-xs text-base-content/60 flex flex-wrap items-center justify-between gap-2 font-mono">
        <span className="flex items-center gap-2">
          <span className="status-dot" />
          <span className="tracking-widest uppercase opacity-70">YoRHa · S9 · {new Date().getFullYear()} · rafael ledo</span>
        </span>
        <span className="opacity-50 tracking-widest uppercase text-[0.65rem]">// vite · react · tailwind</span>
      </div>
    </footer>
  );
}
