import { useState } from 'react';
import { Story } from '@/types/instagram';
import { StoryCircle } from './StoryCircle';
import { StoryViewer } from './StoryViewer';

interface StoriesBarProps {
  stories: Story[];
}

export function StoriesBar({ stories }: StoriesBarProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const handleStoryClick = (index: number) => {
    const story = stories[index];
    if (story.items.length > 0) {
      setSelectedStoryIndex(index);
    }
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  const handleNext = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      const nextIndex = selectedStoryIndex + 1;
      if (stories[nextIndex].items.length > 0) {
        setSelectedStoryIndex(nextIndex);
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      const prevIndex = selectedStoryIndex - 1;
      if (stories[prevIndex].items.length > 0) {
        setSelectedStoryIndex(prevIndex);
      }
    }
  };

  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
          {stories.map((story, index) => (
            <StoryCircle
              key={story.id}
              story={story}
              onClick={() => handleStoryClick(index)}
            />
          ))}
        </div>
      </div>

      {selectedStoryIndex !== null && stories[selectedStoryIndex] && (
        <StoryViewer
          story={stories[selectedStoryIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
