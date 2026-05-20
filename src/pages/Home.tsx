import { Link } from 'react-router-dom';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import { posts } from '../lib/posts';

export default function Home() {
  const recent = posts.slice(0, 5);
  return (
    <div className="space-y-14">
      <section className="hud-frame p-6 sm:p-10 space-y-5">
        <span className="hud-c1" /><span className="hud-c2" />
        <div className="flex items-center justify-between">
          <div className="hud-label">YoRHa No.2 Type S · designation 0xR-LEDO</div>
          <div className="hidden sm:flex items-center gap-1.5 text-[0.65rem] tracking-widest uppercase text-base-content/50">
            <span className="status-dot" /> signal acquired
          </div>
        </div>

        <div className="data-stream text-xs">▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░ ░▒▓ ▓▒░</div>

        <h1 className="display-serif-xl">
          <span className="glitch" data-text="Rafael Ledo">Rafael Ledo</span>
          <span className="term-cursor" />
        </h1>

        <p className="text-base-content/75 max-w-2xl leading-relaxed">
          <span className="text-secondary">&gt;</span> software engineer. building for the web,
          digging into developer tooling, occasionally pushing fixes upstream.
          this is the notebook — equal parts writing and shipping.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link to="/blog" className="btn btn-primary btn-sm">
            <span>access ./blog</span> <ArrowRight size={14} />
          </Link>
          <Link to="/projects" className="btn btn-ghost btn-sm border border-base-300 hover:border-secondary/60">
            <FolderGit2 size={14} /> projects
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="hud-label">
            § ls ~/posts | head -5
          </h2>
          <Link to="/blog" className="text-xs text-secondary hover:text-accent transition">all transmissions →</Link>
        </div>
        <ul className="divide-y divide-base-300 border border-base-300 bg-base-200/30">
          {recent.map((p, i) => (
            <li key={p.slug} className="group">
              <Link
                to={`/blog/${p.slug}`}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 hover:bg-base-200/80 transition relative"
              >
                <span className="text-[0.65rem] text-secondary/60 font-mono tracking-widest shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-base-content/50 font-mono shrink-0 w-24">{p.date}</span>
                <span className="font-medium flex-1 truncate group-hover:text-primary transition">{p.title}</span>
                {p.tags && <span className="text-xs text-base-content/40 truncate">{p.tags.slice(0, 2).join(' · ')}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
