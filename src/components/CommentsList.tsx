import type { Comment } from '@/types/comment';
import CommentCard from './CommentCard';

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
}
