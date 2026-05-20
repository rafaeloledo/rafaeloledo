import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="hud-label mb-3">// signal lost</div>
      <h1 className="display-serif-xl mb-2">
        <span className="glitch" data-text="404">404</span>
      </h1>
      <pre className="text-error text-sm mb-6 opacity-80">▓▒░ no such file or directory ░▒▓</pre>
      <p className="text-base-content/70 mb-6">whatever you were looking for, it isn't here.</p>
      <Link to="/" className="btn btn-primary btn-sm">cd ~</Link>
    </div>
  );
}
