import { useState, useEffect, useCallback } from 'react';
import { Story } from '@/types/instagram';
import { X } from 'lucide-react';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StoryViewer({ story, onClose, onNext, onPrev }: StoryViewerProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentItem = story.items[currentItemIndex];
  const duration = currentItem?.duration || 5000;

  const goToNext = useCallback(() => {
    if (currentItemIndex < story.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setProgress(0);
    } else {
      onNext();
    }
  }, [currentItemIndex, story.items.length, onNext]);

  const goToPrev = useCallback(() => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      setProgress(0);
    } else {
      onPrev();
    }
  }, [currentItemIndex, onPrev]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentItemIndex, duration, goToNext]);

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  if (!currentItem) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black animate-fade-in">
      {/* Progress bars */}
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
        {story.items.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentItemIndex ? '100%' : index === currentItemIndex ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-6 left-0 right-0 px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white text-sm font-medium">{story.user.username}</span>
          <span className="text-white/60 text-xs">2h</span>
        </div>
        <button onClick={onClose} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Story content */}
      <div className="w-full h-full" onClick={handleTap}>
        <img
          src={currentItem.url}
          alt="Story"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
