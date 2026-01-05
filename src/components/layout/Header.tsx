import { Heart, MessageCircle, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent">
            Instagram
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link to="/create" className="text-foreground hover:opacity-60 transition-opacity">
            <PlusSquare className="w-6 h-6" />
          </Link>
          <button className="text-foreground hover:opacity-60 transition-opacity relative">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-instagram-red rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              3
            </span>
          </button>
          <button className="text-foreground hover:opacity-60 transition-opacity relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-instagram-red rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              5
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
