import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/welcome" className="serif text-xl font-semibold text-foreground">
            Portfolio × Research
          </Link>
          <div className="flex gap-8">
            <Link to="/blog" className="nav-link">Read</Link>
            <Link to="/portfolio" className="nav-link">See</Link>
            <Link to="/" className="nav-link">Echo</Link>
            <Link to="/hikki" className="nav-link">Hikki</Link>
            <Link to="/history" className="nav-link">History</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center">
          <nav className="flex gap-6">
            <Link to="/blog" className="text-sm nav-link">Read</Link>
            <Link to="/portfolio" className="text-sm nav-link">See</Link>
            <Link to="/" className="text-sm nav-link">Echo</Link>
            <Link to="/hikki" className="text-sm nav-link">Hikki</Link>
            <Link to="/history" className="text-sm nav-link">History</Link>
            <Link to="/about" className="text-sm nav-link">About</Link>
          </nav>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            © 2024 Portfolio × Research — Quiet thoughts, honest work
          </p>
        </div>
      </div>
    </footer>
  );
}
