import { Link } from 'react-router-dom';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import { posts } from '../lib/posts';

export default function Home() {
  const recent = posts.slice(0, 5);
  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <div className="text-xs text-base-content/50">
          <span className="text-primary">$</span> whoami
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Rafael Ledo
          <span className="term-cursor" />
        </h1>
        <p className="text-base-content/70 max-w-2xl">
          Software engineer. I build for the web, dig into developer tooling, and occasionally
          push fixes upstream. This is my notebook — equal parts writing and shipping.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link to="/blog" className="btn btn-primary btn-sm">read the blog <ArrowRight size={14} /></Link>
          <Link to="/projects" className="btn btn-ghost btn-sm border border-base-300"><FolderGit2 size={14} /> projects</Link>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm uppercase tracking-wider text-base-content/60">
            <span className="text-primary">$</span> ls ~/posts | head -5
          </h2>
          <Link to="/blog" className="text-xs text-secondary hover:underline">all posts →</Link>
        </div>
        <ul className="divide-y divide-base-300 border border-base-300 rounded-lg overflow-hidden bg-base-200/30">
          {recent.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 hover:bg-base-200 transition"
              >
                <span className="text-xs text-base-content/50 font-mono shrink-0 w-24">{p.date}</span>
                <span className="font-medium flex-1 truncate">{p.title}</span>
                {p.tags && <span className="text-xs text-base-content/40 truncate">{p.tags.slice(0, 2).join(' · ')}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
