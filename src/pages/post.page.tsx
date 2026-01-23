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
import { useEffect, useState } from 'react';
import { getPostService } from '@/services/get-post.service';
import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostService(postId);
        const postData = Array.isArray(data) ? data[0] : data;
        if (!postData) throw new Error();
        setPost(postData);
      } catch {
        setError('Failed to fetch post data :(');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    if (!postId || isPending) return;
    try {
      setIsPending(true);
      await apiClient.post(`/news/${postId}/like`);
      const data = await getPostService(postId);
      const postData = Array.isArray(data) ? data[0] : data;
      if (!postData) return;
      setPost(postData);
    } finally {
      setIsPending(false);
    }
  };

  const handleDislike = async () => {
    if (!postId || isPending) return;
    try {
      setIsPending(true);
      await apiClient.post(`/news/${postId}/dislike`);
      const data = await getPostService(postId);
      const postData = Array.isArray(data) ? data[0] : data;
      if (!postData) return;
      setPost(postData);
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-[50%] mb-6" />
        <Skeleton className="h-120 w-full" />
      </div>
    );
  }

  if (error || !post) {
    return <div>{error || 'Post not found :('}</div>;
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

      <div className="flex gap-8 p-9">
        <div>
          <div className="flex justify-between items-center mb-5 border-b pb-2 border-black">
            <h2 className="font-bold text-2xl">{post.title}</h2>
            <time className="text-stone-600" dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
          </div>
          <p>{post.body}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-80 h-92 flex justify-center bg-stone-300 items-center">
            <img src={post.imageUrl} alt={post.title} />
          </div>
          <p className="text-black font-medium">{post.tags}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 ml-9">
          <Button
            onClick={handleLike}
            disabled={isPending}
            className="flex items-center gap-1 text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
          >
            {post.likes}
            <ThumbsUp />
          </Button>
          <Button
            onClick={handleDislike}
            disabled={isPending}
            className="flex items-center gap-1 text-[rgba(170,154,78,1)] bg-transparent hover:bg-stone-200"
          >
            {post.dislikes}
            <ThumbsDown />
          </Button>
        </div>

        <div className="flex items-center gap-6 ml-9">
          <div className="flex items-center gap-1">
            194
            <Eye />
          </div>
          <div className="flex items-center gap-1">
            2
            <MessageSquareMore />
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
