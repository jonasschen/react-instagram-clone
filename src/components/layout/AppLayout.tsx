import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
}

export function AppLayout({ children, showHeader = true, showNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header />}
      <main className={`max-w-lg mx-auto ${showHeader ? 'pt-14' : ''} ${showNav ? 'pb-14' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
