import { AppLayout } from '@/components/layout/AppLayout';
import { StoriesBar } from '@/components/stories/StoriesBar';
import { Feed } from '@/components/feed/Feed';
import { mockStories, mockPosts } from '@/data/mockData';

export default function Index() {
  return (
    <AppLayout>
      <StoriesBar stories={mockStories} />
      <Feed initialPosts={mockPosts} />
    </AppLayout>
  );
}
