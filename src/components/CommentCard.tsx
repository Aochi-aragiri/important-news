import { dislikeCommentService } from '@/services/dislike-comment.service';
import { likeCommentService } from '@/services/like-comment.service';
import type { Comment } from '@/types/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

type CommentCardProps = {
  comment: Comment;
};

export default function CommentCard({ comment }: CommentCardProps) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => likeCommentService(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: () => dislikeCommentService(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  return (
    <div className="bg-white rounded-4xl p-5 mb-4">
      <div className="flex justify-between mb-1">
        <h2 className="font-bold text-lg">{comment.author}</h2>
        <p>{format(new Date(), 'MMM d, yyyy')}</p>
      </div>
      <p className="mb-4 break-all">{comment.text}</p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => likeMutation.mutate()}
          disabled={likeMutation.isPending}
          className="text-sm flex items-center justify-center gap-1 cursor-pointer hover:bg-[rgba(170,154,78,1)] p-1 rounded-2xl"
        >
          {comment.likes} <ThumbsUp />
        </button>
        <button
          type="button"
          onClick={() => dislikeMutation.mutate()}
          disabled={dislikeMutation.isPending}
          className="text-sm flex items-center justify-center gap-1 cursor-pointer hover:bg-[rgba(170,154,78,1)] p-1 rounded-2xl"
        >
          {comment.dislikes} <ThumbsDown />
        </button>
      </div>
    </div>
  );
}
