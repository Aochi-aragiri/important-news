import { useQuery } from '@tanstack/react-query';
import CommentsList from './CommentsList';
import { useParams } from 'react-router';
import { getCommentsService } from '@/services/get-comments.service';
import { Spinner } from './ui/spinner';
import { Alert } from './ui/alert';

export default function CommentsSection() {
  const { postId } = useParams() as { postId: string };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', postId, 'comments'],
    queryFn: () => getCommentsService(postId),
  });

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && (
        <Alert className="flex justify-center text-2xl">
          Failed to load comments
        </Alert>
      )}
      {data && <CommentsList comments={data} />}
    </div>
  );
}
