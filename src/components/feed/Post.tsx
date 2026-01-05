import { useState } from 'react';
import { Post as PostType } from '@/types/instagram';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostProps {
  post: PostType;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
}

export function Post({ post, onLike, onSave }: PostProps) {
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const handleDoubleTap = () => {
    if (!post.isLiked) {
      onLike(post.id);
    }
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
  };

  const formatLikes = (likes: number) => {
    if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`;
    return likes.toString();
  };

  return (
    <article className="border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{post.user.username}</span>
              {post.user.isVerified && (
                <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        <button className="p-2 hover:opacity-60 transition-opacity">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative aspect-square bg-secondary cursor-pointer"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={post.images[0]}
          alt="Post"
          className="w-full h-full object-cover"
        />
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className="w-24 h-24 text-white animate-like-pop"
              fill="white"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(post.id)}
              className={`transition-transform active:scale-90 ${post.isLiked ? 'animate-heart-beat' : ''}`}
            >
              <Heart
                className={`w-6 h-6 ${post.isLiked ? 'text-instagram-red fill-instagram-red' : ''}`}
              />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => onSave(post.id)}
            className="hover:opacity-60 transition-opacity"
          >
            <Bookmark
              className={`w-6 h-6 ${post.isSaved ? 'fill-foreground' : ''}`}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-1">
          {formatLikes(post.likes)} curtidas
        </p>

        {/* Caption */}
        <p className="text-sm mb-1">
          <span className="font-semibold">{post.user.username}</span>{' '}
          {post.caption}
        </p>

        {/* Comments */}
        {post.comments.length > 0 && (
          <button className="text-sm text-muted-foreground mb-1">
            Ver todos os {post.comments.length} comentários
          </button>
        )}

        {/* Preview comments */}
        {post.comments.slice(0, 2).map((comment) => (
          <p key={comment.id} className="text-sm mb-0.5">
            <span className="font-semibold">{comment.user.username}</span>{' '}
            {comment.text}
          </p>
        ))}

        {/* Time */}
        <p className="text-xs text-muted-foreground mt-2 mb-3">
          {formatDistanceToNow(post.createdAt, { locale: ptBR, addSuffix: true })}
        </p>
      </div>
    </article>
  );
}
