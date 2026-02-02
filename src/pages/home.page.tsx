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
import { Spinner } from '@/components/ui/spinner';
import { getCreatePostPath } from '@/constants/routes';
import { searchNewsService } from '@/services/search-news.service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import { ErrorAlert } from '@/components/ErrorAlert';
import { PostsList } from '@/components/PostList';

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
        {isLoading && <Spinner className="fixed top-4 right-4" />}
        {isError && <ErrorAlert />}
        {data?.data && <PostsList posts={data.data} />}

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
