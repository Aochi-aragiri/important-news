import { PostCard } from './PostCard';
import type { PostWithComments } from '@/services/search-news.service';

type PostsListProps = {
  posts: PostWithComments[];
};

export function PostsList({ posts }: PostsListProps) {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
