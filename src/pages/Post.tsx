import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPost } from '../lib/posts';
import { Markdown } from '../components/Markdown';
import NotFound from './NotFound';

export default function Post() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <NotFound />;

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/blog" className="text-xs text-base-content/60 hover:text-primary inline-flex items-center gap-1 mb-6">
        <ArrowLeft size={12} /> cd ../blog
      </Link>
      <header className="mb-8 space-y-2">
        <div className="text-xs text-base-content/50 font-mono">{post.date}</div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.description && <p className="text-base-content/70">{post.description}</p>}
        {post.tags && (
          <div className="flex gap-1.5 pt-1">
            {post.tags.map((t) => (
              <span key={t} className="text-xs text-secondary">#{t}</span>
            ))}
          </div>
        )}
      </header>
      <Markdown>{post.content}</Markdown>
    </article>
  );
}
