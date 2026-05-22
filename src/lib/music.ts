export type Music = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  content: string;
  artist?: string;
  anime?: string;
  year?: string;
  thumb?: string;
};

function parseFrontmatter(raw: string): { data: Record<string, any>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, any> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^(\w[\w-]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    let v: any = m[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v
        .slice(1, -1)
        .split(',')
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    data[m[1]] = v;
  }
  return { data, body: match[2] };
}

function fileNameToMeta(path: string): { date: string; fallbackSlug: string; fallbackTitle: string } {
  const file = path.split('/').pop()!.replace(/\.md$/, '');
  const m = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/.exec(file);
  if (m) {
    const [, y, mo, d, rest] = m;
    return {
      date: `${y}-${mo}-${d}`,
      fallbackSlug: rest.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      fallbackTitle: rest.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  }
  return { date: '1970-01-01', fallbackSlug: file, fallbackTitle: file };
}

const modules = import.meta.glob('../music/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const musics: Music[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const meta = fileNameToMeta(path);
    return {
      slug: data.slug || meta.fallbackSlug,
      title: data.title || meta.fallbackTitle,
      date: data.date || meta.date,
      description: data.description,
      tags: data.tags,
      content: body.trim(),
      artist: data.artist,
      anime: data.anime,
      year: data.year,
      thumb: data.thumb,
    } as Music;
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getMusic(slug: string): Music | undefined {
  return musics.find((m) => m.slug === slug);
}
