export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified?: boolean;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
  likes: number;
}

export interface Story {
  id: string;
  user: User;
  items: StoryItem[];
  hasUnwatched: boolean;
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number;
  createdAt: Date;
}
