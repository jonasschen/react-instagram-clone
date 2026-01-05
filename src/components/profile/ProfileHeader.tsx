import { User } from '@/types/instagram';
import { Settings, Grid3X3, Bookmark, UserSquare2 } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
  posts: string[];
}

export function ProfileHeader({ user, isCurrentUser = false, posts }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div>
      {/* Profile Info */}
      <div className="px-4 py-4">
        <div className="flex items-start gap-6 mb-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h1 className="text-xl font-normal">{user.username}</h1>
              {user.isVerified && (
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
              {isCurrentUser && (
                <button className="ml-auto p-2">
                  <Settings className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <span className="font-semibold">{formatNumber(user.postsCount)}</span>
                <p className="text-muted-foreground">posts</p>
              </div>
              <div className="text-center">
                <span className="font-semibold">{formatNumber(user.followers)}</span>
                <p className="text-muted-foreground">seguidores</p>
              </div>
              <div className="text-center">
                <span className="font-semibold">{formatNumber(user.following)}</span>
                <p className="text-muted-foreground">seguindo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="font-semibold text-sm">{user.displayName}</p>
          {user.bio && (
            <p className="text-sm whitespace-pre-line">{user.bio}</p>
          )}
        </div>

        {/* Action buttons */}
        {isCurrentUser ? (
          <div className="flex gap-2">
            <button className="flex-1 bg-secondary text-foreground font-semibold py-1.5 px-4 rounded-lg text-sm">
              Editar perfil
            </button>
            <button className="flex-1 bg-secondary text-foreground font-semibold py-1.5 px-4 rounded-lg text-sm">
              Compartilhar perfil
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 font-semibold py-1.5 px-4 rounded-lg text-sm ${
                isFollowing
                  ? 'bg-secondary text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
            <button className="flex-1 bg-secondary text-foreground font-semibold py-1.5 px-4 rounded-lg text-sm">
              Mensagem
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-t border-border">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 flex justify-center ${
            activeTab === 'posts' ? 'border-b-2 border-foreground' : 'text-muted-foreground'
          }`}
        >
          <Grid3X3 className="w-6 h-6" />
        </button>
        {isCurrentUser && (
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 flex justify-center ${
              activeTab === 'saved' ? 'border-b-2 border-foreground' : 'text-muted-foreground'
            }`}
          >
            <Bookmark className="w-6 h-6" />
          </button>
        )}
        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex-1 py-3 flex justify-center ${
            activeTab === 'tagged' ? 'border-b-2 border-foreground' : 'text-muted-foreground'
          }`}
        >
          <UserSquare2 className="w-6 h-6" />
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post, index) => (
          <button key={index} className="aspect-square">
            <img
              src={post}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
