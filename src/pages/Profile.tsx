import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { currentUser, userPosts } from '@/data/mockData';

export default function Profile() {
  return (
    <AppLayout>
      <ProfileHeader user={currentUser} isCurrentUser posts={userPosts} />
    </AppLayout>
  );
}
