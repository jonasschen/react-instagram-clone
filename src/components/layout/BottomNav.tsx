import { Home, Search, PlusSquare, Film, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { currentUser } from '@/data/mockData';

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className={`p-2 transition-opacity ${isActive('/') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <Home className="w-6 h-6" fill={isActive('/') ? 'currentColor' : 'none'} />
        </Link>

        <Link
          to="/search"
          className={`p-2 transition-opacity ${isActive('/search') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <Search className="w-6 h-6" strokeWidth={isActive('/search') ? 3 : 2} />
        </Link>

        <Link
          to="/create"
          className={`p-2 transition-opacity ${isActive('/create') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <PlusSquare className="w-7 h-7" />
        </Link>

        <Link
          to="/reels"
          className={`p-2 transition-opacity ${isActive('/reels') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <Film className="w-6 h-6" fill={isActive('/reels') ? 'currentColor' : 'none'} />
        </Link>

        <Link
          to="/profile"
          className={`p-2 transition-opacity ${isActive('/profile') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className={`w-7 h-7 rounded-full overflow-hidden ${isActive('/profile') ? 'ring-2 ring-foreground' : ''}`}>
            <img
              src={currentUser.avatar}
              alt="Seu perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
