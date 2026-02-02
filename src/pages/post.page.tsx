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
import { format } from 'date-fns';
import { ErrorAlert } from '@/components/ErrorAlert';
import { likePostService } from '@/services/like-post.service';
import { dislikePostService } from '@/services/dislike-post.service';
import Markdown from 'react-markdown';
import CommentForm from '@/components/comment-form';

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

  // TODO move to separate component

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

      <div className="flex gap-8 p-9 justify-between min-h-50">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5 border-b pb-2 border-black">
            <h2 className="font-bold text-2xl">{data.title}</h2>
            <time className="text-stone-600" dateTime={data.createdAt}>
              {format(data.createdAt, 'MMM d, yyyy')}
            </time>
          </div>
          <article className="prose">
            <Markdown>{data.body}</Markdown>
          </article>
        </div>
        <div className="flex flex-col gap-3">
          <div className="max-w-80 max-h-92 flex justify-center bg-stone-300 items-center">
            <img src={data.imageUrl} alt={data.title} />
          </div>
          <p className="text-black font-medium">{data.tags}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 ml-9">
          <Button
            onClick={handleLike}
            disabled={isLoading}
            className="flex items-center gap-1 text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
          >
            {data.likes}
            <ThumbsUp />
          </Button>
          <Button
            onClick={handleDislike}
            disabled={isLoading}
            className="flex items-center gap-1 text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
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
