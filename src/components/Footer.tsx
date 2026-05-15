export function Footer() {
  return (
    <footer className="border-t border-base-300 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-xs text-base-content/60 flex flex-wrap items-center justify-between gap-2">
        <span>
          <span className="text-primary">$</span> echo "© {new Date().getFullYear()} Rafael Ledo"
        </span>
        <span className="opacity-70">built with vite · react · tailwind · daisyui</span>
      </div>
    </footer>
  );
}
