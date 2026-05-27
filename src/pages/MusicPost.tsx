import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getMusic } from '../lib/music';
import { MusicThumb } from '../components/MusicThumb';
import { Markdown } from '../components/Markdown';
import NotFound from './NotFound';

export default function MusicPost() {
  const { slug } = useParams();
  const music = slug ? getMusic(slug) : undefined;
  if (!music) return <NotFound />;

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/music" className="text-xs text-base-content/60 hover:text-primary inline-flex items-center gap-1 mb-6">
        <ArrowLeft size={12} /> cd ../music
      </Link>

      {(music.youtube || music.thumb) && (
        <div className="hud-frame mb-6 overflow-hidden max-h-72">
          <MusicThumb music={music} className="w-full max-h-72 object-cover" />
        </div>
      )}

      <header className="mb-8 space-y-3">
        <div className="text-xs text-base-content/50 font-mono">{music.date}</div>
        <h1 className="text-3xl font-bold">{music.title}</h1>
        {music.description && <p className="text-base-content/70">{music.description}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 pt-4 border-t border-base-300">
          {music.artist && (
            <div>
              <div className="hud-label mb-0.5">artista</div>
              <div className="text-sm">{music.artist}</div>
            </div>
          )}
          {music.anime && (
            <div>
              <div className="hud-label mb-0.5">anime</div>
              <div className="text-sm">{music.anime}</div>
            </div>
          )}
          {music.year && (
            <div>
              <div className="hud-label mb-0.5">ano</div>
              <div className="text-sm">{music.year}</div>
            </div>
          )}
        </div>

        {music.tags && (
          <div className="flex gap-1.5 pt-1">
            {music.tags.map((t) => (
              <span key={t} className="text-xs text-secondary">#{t}</span>
            ))}
          </div>
        )}

        {music.youtube && (
          <div className="pt-3">
            {/* Plain music.youtube.com URL — the OS App Links / Universal Links
                mechanism routes this to the YouTube Music app if installed.
                No JS tricks: intent:// is Chrome-only and unreliable. */}
            <a
              href={`https://app.music.youtube.com/watch?v=${music.youtube}`}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-base-content/60 hover:text-primary border border-base-300 hover:border-primary px-3 py-1.5 transition-colors"
            >
              <ExternalLink size={11} />
              ouvir no YouTube Music
            </a>
          </div>
        )}
      </header>

      <Markdown>{music.content}</Markdown>
    </article>
  );
}
