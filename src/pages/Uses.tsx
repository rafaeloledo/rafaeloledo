const groups: { title: string; items: { name: string; note?: string }[] }[] = [
  {
    title: 'editor',
    items: [
      { name: 'Neovim', note: 'daily driver' },
      { name: 'VS Code', note: 'when sharing a screen' },
    ],
  },
  {
    title: 'terminal',
    items: [
      { name: 'WezTerm' },
      { name: 'Alacritty' },
      { name: 'Starship', note: 'prompt' },
    ],
  },
  {
    title: 'languages',
    items: [
      { name: 'TypeScript' },
      { name: 'Go' },
      { name: 'Rust', note: 'learning' },
      { name: 'Python' },
    ],
  },
  {
    title: 'web',
    items: [
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'DaisyUI' },
      { name: 'Vite' },
    ],
  },
  {
    title: 'runtime',
    items: [
      { name: 'Bun', note: 'package manager + runtime' },
      { name: 'Node.js' },
    ],
  },
  {
    title: 'toolchain',
    items: [
      { name: 'mise', note: 'system deps' },
      { name: 'Scoop', note: 'windows package manager' },
      { name: 'Git' },
    ],
  },
  {
    title: 'os',
    items: [
      { name: 'Windows 11', note: 'primary' },
      { name: 'WSL2 / Linux' },
    ],
  },
];

export default function Uses() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="hud-label mb-2">§ loadout · cat ~/.config/uses.toml</div>
      <h1 className="display-serif mb-3">
        <span className="glitch" data-text="Equipment">Equipment</span>
      </h1>
      <p className="text-base-content/70 mb-8"><span className="text-secondary">&gt;</span> stack and tools that make a workday.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="border border-base-300 bg-base-200/30 overflow-hidden relative">
            <div className="px-3 py-2 border-b border-base-300 text-[0.65rem] tracking-widest uppercase text-primary font-bold flex justify-between">
              <span>// {g.title}</span>
              <span className="text-secondary/60">{String(g.items.length).padStart(2, '0')}</span>
            </div>
            <ul className="px-3 py-2 space-y-1.5 text-sm">
              {g.items.map((i) => (
                <li key={i.name} className="flex items-baseline gap-2">
                  <span className="text-primary/70">▸</span>
                  <span className="font-medium">{i.name}</span>
                  {i.note && <span className="text-xs text-base-content/50 ml-auto">{i.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
