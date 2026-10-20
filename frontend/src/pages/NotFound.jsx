import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="empty-state"><h1>Page not found</h1><p>Sorry, we couldn't find that page.</p><Link className="button" to="/">Return home</Link></section>;
}
