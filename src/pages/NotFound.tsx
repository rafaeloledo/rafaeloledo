import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="text-xs text-base-content/50 mb-2"><span className="text-primary">$</span> cat ./that-page</div>
      <pre className="text-error text-sm mb-6">cat: ./that-page: No such file or directory</pre>
      <h1 className="text-3xl font-bold mb-3">404</h1>
      <p className="text-base-content/70 mb-6">Whatever you were looking for, it isn't here.</p>
      <Link to="/" className="btn btn-primary btn-sm">cd ~</Link>
    </div>
  );
}
