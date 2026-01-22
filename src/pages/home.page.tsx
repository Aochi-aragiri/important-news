import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/components/ui/select';
import { getCreatePostPath, getPostPath } from '@/constants/routes';
import { searchNewsService } from '@/services/search-news.service';
import { useQuery } from '@tanstack/react-query';
import {
  ExternalLink,
  Eye,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const PerPage = 5;

export default function HomePage() {
  const [page] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', page],
    queryFn: () => searchNewsService(page, PerPage),
  });
  return (
    <div>
      <div className="flex gap-4 mb-10">
        <Input placeholder="#tag #lol" className="bg-amber-100"></Input>
        <Button asChild>
          <Link to={getCreatePostPath()}>Create Post</Link>
        </Button>
        <Select>
          <SelectTrigger className="w-45 ">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-primary">
              <SelectLabel>Values</SelectLabel>
              <SelectItem value="Time Added">Time Added</SelectItem>
              <SelectItem value="Most Likes">Most Likes</SelectItem>
              <SelectItem value="Most Views">Most Views</SelectItem>
              <SelectItem value="Most Comments">Most Comments</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="pr-12 pl-12">
        {isLoading && (
          <p className="flex justify-center text-2xl">Loading posts...</p>
        )}
        {isError && (
          <p className="flex justify-center text-2xl">Failed to load posts.</p>
        )}
        {data?.data.map((post) => (
          <div
            key={post.id}
            className="flex justify-between bg-amber-100 gap-40 p-5 rounded-2xl mb-20"
          >
            <div className="flex flex-col gap-6">
              <Link
                to={getPostPath(post.id)}
                className="text-2xl flex items-center gap-3.5"
              >
                {post.title} <ExternalLink />
              </Link>
              <p className="text-sm">{post.body}</p>
              <p className="text-xm">{post.tags}</p>
              <div className="flex gap-4 ">
                <p className="text-sm flex items-center justify-center gap-1">
                  {post.likes} <ThumbsUp />
                </p>
                <p className="text-sm flex items-center justify-center gap-1">
                  {post.dislikes} <ThumbsDown />
                </p>
                <p className="text-sm flex items-center justify-center gap-1">
                  194 <Eye />
                </p>
                <p className="text-sm flex items-center justify-center gap-1">
                  2 <MessageSquareMore />
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <img
                src={post.imageUrl}
                alt="cat"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>
          </div>
        ))}

        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
