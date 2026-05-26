export type Contribution = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  description?: string;
  tags?: string[];
  repo: string;
  pr_url: string;
  pr_number: number;
  status: 'merged' | 'open' | 'closed';
  content: string;
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

function fileNameToMeta(path: string): { date: string; fallbackSlug: string } {
  const file = path.split('/').pop()!.replace(/\.md$/, '');
  const m = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/.exec(file);
  if (m) {
    const [, y, mo, d, rest] = m;
    return {
      date: `${y}-${mo}-${d}`,
      fallbackSlug: rest.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };
  }
  return { date: '1970-01-01', fallbackSlug: file };
}

const modules = import.meta.glob('../contributions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const contributions: Contribution[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const meta = fileNameToMeta(path);
    return {
      slug: data.slug || meta.fallbackSlug,
      title: data.title || meta.fallbackSlug,
      date: data.date || meta.date,
      description: data.description,
      tags: data.tags,
      repo: data.repo || '',
      pr_url: data.pr_url || '',
      pr_number: Number(data.pr_number) || 0,
      status: (data.status as Contribution['status']) || 'closed',
      content: body.trim(),
    } as Contribution;
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getContribution(slug: string): Contribution | undefined {
  return contributions.find((c) => c.slug === slug);
}
