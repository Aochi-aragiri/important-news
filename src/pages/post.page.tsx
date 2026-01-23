import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Edit,
  Eye,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useParams } from 'react-router-dom';
import { getEditPostPath, getHomePath } from '@/constants/routes';
import { getPostService } from '@/services/get-post.service';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function PostPage() {
  const { postId } = useParams() as { postId: string };

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', postId],
    queryFn: () => getPostService(postId),
  });

  const handleLike = async () => {};

  const handleDislike = async () => {};

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-[50%] mb-6" />
        <Skeleton className="h-120 w-full" />
      </div>
    );
  }

  // TODO replace with Alert
  // TODO move to separate component

  if (error) {
    return <div>{error.message || 'Post not found :('}</div>;
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
        <div className="flex gap-4">
          <Button asChild className="size-9 text-black">
            <Link to={getEditPostPath(postId!)}>
              <Edit />
            </Link>
          </Button>
          <Button className="size-9 text-black bg-[rgba(213,114,114,1)]">
            <Trash />
          </Button>
        </div>
      </div>

      <div className="flex gap-8 p-9 justify-between min-h-50">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5 border-b pb-2 border-black">
            <h2 className="font-bold text-2xl">{data.title}</h2>
            <time className="text-stone-600" dateTime={data.createdAt}>
              {format(data.createdAt, 'MMM d, yyyy')}
            </time>
          </div>
          <p>{data.body}</p>
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

      <div className="bg-[rgba(68,68,68,1)]">
        <div className="container mx-auto p-8 max-w-200 mt-5 flex flex-col gap-8">
          <h1 className="font-bold text-2xl text-[rgba(170,154,78,1)] ml-9 pb-1">
            Comments
          </h1>
          <Input
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your nickname..."
          />
          <Textarea
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your comment here..."
          />
          <div className="flex flex-row-reverse border-b border-stone-400 pb-8">
            <Button className="text-white rounded-2xl">Create comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
