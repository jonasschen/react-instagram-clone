import { AppLayout } from '@/components/layout/AppLayout';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const exploreImages = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
  ];

  return (
    <AppLayout showHeader={false}>
      <div className="p-3">
        <div className="relative mb-3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full bg-secondary rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {exploreImages.map((img, i) => (
          <div key={i} className={i === 6 ? 'row-span-2' : ''}>
            <img src={img} alt="" className="w-full h-full object-cover aspect-square" />
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
