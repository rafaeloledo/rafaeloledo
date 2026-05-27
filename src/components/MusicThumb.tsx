import { useState } from 'react';
import { Music2 } from 'lucide-react';
import type { Music } from '../lib/music';
import { getMusicThumb } from '../lib/music';

type Props = {
  music: Music;
  className?: string;
  iconSize?: number;
};

/**
 * Renders a music thumbnail with a three-stage fallback:
 *   1. YouTube maxresdefault.jpg  (1280×720)
 *   2. YouTube hqdefault.jpg      (480×360, always present)
 *   3. Local SVG thumb
 *   4. Music2 icon
 *
 * YouTube returns HTTP 200 with a 120×90 placeholder image when a
 * resolution doesn't exist, so onError alone isn't enough — we also
 * check naturalWidth on every load.
 */
export function MusicThumb({ music, className = 'w-full h-full object-cover', iconSize = 24 }: Props) {
  const [src, setSrc] = useState<string | undefined>(getMusicThumb(music));

  const tryNext = (current: string) => {
    if (music.youtube && current.includes('maxresdefault')) {
      setSrc(`https://i.ytimg.com/vi/${music.youtube}/hqdefault.jpg`);
    } else if (music.thumb && current !== music.thumb) {
      setSrc(music.thumb);
    } else {
      setSrc(undefined);
    }
  };

  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center text-base-content/30">
        <Music2 size={iconSize} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={music.title}
      className={className}
      onLoad={(e) => {
        // YouTube serves a 120×90 placeholder (HTTP 200) for missing sizes
        if (e.currentTarget.naturalWidth <= 120) tryNext(src);
      }}
      onError={() => tryNext(src)}
    />
  );
}
