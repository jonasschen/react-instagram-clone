import { Story } from '@/types/instagram';
import { Plus } from 'lucide-react';
import { currentUser } from '@/data/mockData';

interface StoryCircleProps {
  story: Story;
  onClick: () => void;
}

export function StoryCircle({ story, onClick }: StoryCircleProps) {
  const isCurrentUser = story.user.id === 'current';
  const hasStories = story.items.length > 0;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 min-w-[70px]"
    >
      <div className={`relative ${story.hasUnwatched && hasStories ? 'story-ring' : ''}`}>
        <div className={`${story.hasUnwatched && hasStories ? 'story-ring-inner' : ''}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background">
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {isCurrentUser && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
            <Plus className="w-3 h-3 text-primary-foreground" />
          </div>
        )}
      </div>
      <span className="text-xs truncate w-16 text-center text-foreground">
        {isCurrentUser ? 'Seu story' : story.user.username.split('.')[0]}
      </span>
    </button>
  );
}
