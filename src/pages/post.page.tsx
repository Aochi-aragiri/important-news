import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Edit,
  Eye,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { Link, useParams } from 'react-router';
import { getEditPostPath, getHomePath } from '@/constants/routes';
import { getPostService } from '@/services/get-post.service';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorAlert } from '@/components/ErrorAlert';
import { likePostService } from '@/services/like-post.service';
import { dislikePostService } from '@/services/dislike-post.service';
import CommentForm from '@/components/comment-form';
import PostData from '@/components/post-data';

export default function PostPage() {
  const { postId } = useParams() as { postId: string };
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', postId],
    queryFn: () => getPostService(postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePostService(postId),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['news', postId], updatedPost);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: () => dislikePostService(postId),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['news', postId], updatedPost);
    },
  });

  const handleLike = async () => {
    likeMutation.mutate();
  };

  const handleDislike = async () => {
    dislikeMutation.mutate();
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-[50%] mb-6" />
        <Skeleton className="h-120 w-full" />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert />;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button asChild className="bg-stone-300 rounded-none text-black flex">
          <Link to={getHomePath()}>
            <ChevronLeft />
            Go home
          </Link>
        </Button>
        <Button asChild className="size-9 text-black">
          <Link to={getEditPostPath(postId)}>
            <Edit />
          </Link>
        </Button>
      </div>

      <PostData
        title={data.title}
        createdAt={data.createdAt}
        body={data.body}
        imageUrl={data.imageUrl}
        tags={data.tags}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 ml-9">
          <Button
            onClick={handleLike}
            disabled={isLoading}
            className="flex items-center gap-1 cursor-pointer text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
          >
            {data.likes}
            <ThumbsUp />
          </Button>
          <Button
            onClick={handleDislike}
            disabled={isLoading}
            className="flex items-center gap-1 cursor-pointer text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
          >
            {data.dislikes}
            <ThumbsDown />
          </Button>
        </div>

        <div className="flex items-center gap-6 ml-9">
          <div className="flex items-center gap-1 text-sm font-medium">
            {data.views}
            <Eye size={16} />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            2
            <MessageSquareMore size={16} />
          </div>
        </div>
      </div>

      <CommentForm newsId={postId} />
    </div>
  );
}
