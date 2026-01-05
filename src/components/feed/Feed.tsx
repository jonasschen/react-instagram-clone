import { useState } from 'react';
import { Post as PostType } from '@/types/instagram';
import { Post } from './Post';

interface FeedProps {
  initialPosts: PostType[];
}

export function Feed({ initialPosts }: FeedProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onSave={handleSave}
        />
      ))}
    </div>
  );
}
