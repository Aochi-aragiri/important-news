import type { Comment } from '@/types/comment';
import { format } from 'date-fns';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

type CommentCardProps = {
  comment: Comment;
};

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="bg-white rounded-4xl p-5">
      <div className="flex justify-between mb-1">
        <h2 className="font-bold text-lg">{comment.author}</h2>
        <p>{format(new Date(), 'MMM d, yyyy')}</p>
      </div>
      <p className="mb-4">{comment.text}</p>
      <div className="flex gap-4">
        <p className="text-sm flex items-center justify-center gap-1">
          {comment.likes} <ThumbsUp />
        </p>
        <p className="text-sm flex items-center justify-center gap-1">
          {comment.dislikes} <ThumbsDown />
        </p>
      </div>
    </div>
  );
}
