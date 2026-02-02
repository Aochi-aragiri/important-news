import { getPostPath } from '@/constants/routes';
import type { PostWithComments } from '@/services/search-news.service';
import { format } from 'date-fns';
import {
  ExternalLink,
  Eye,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'react-router';
import Markdown from 'react-markdown';

type PostCardProps = {
  post: PostWithComments;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <div
      key={post.id}
      className="flex justify-between bg-amber-100 p-5 rounded-2xl mb-20 gap-6"
    >
      <div className="flex flex-col gap-6 ">
        <Link
          to={getPostPath(post.id)}
          className="text-2xl flex items-center gap-3.5"
        >
          {post.title} <ExternalLink />
        </Link>
        <article className="prose prose-sm max-w-120">
          <Markdown>{post.body}</Markdown>
        </article>
        <p className="text-xm">{post.tags}</p>
        <div className="flex gap-4 ">
          <p className="text-sm flex items-center justify-center gap-1">
            {post.likes} <ThumbsUp />
          </p>
          <p className="text-sm flex items-center justify-center gap-1">
            {post.dislikes} <ThumbsDown />
          </p>
          <p className="text-sm flex items-center justify-center gap-1">
            {post.views} <Eye />
          </p>
          <p className="text-sm flex items-center justify-center gap-1">
            {post.comments.length} <MessageSquareMore />
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <p className="text-sm">
            {format(new Date(post.createdAt), 'MMM d, yyyy')}
          </p>

          <img
            src={post.imageUrl}
            alt="cat"
            className="w-40 h-40 object-cover rounded-xl shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
