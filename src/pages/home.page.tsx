import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { getCreatePostPath } from '@/constants/routes';
import { searchNewsService } from '@/services/search-news.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import { ErrorAlert } from '@/components/ErrorAlert';
import { PostsList } from '@/components/PostList';
import ReactPaginate from 'react-paginate';

const PerPage = 5;

export default function HomePage() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news', page],
    queryFn: () => searchNewsService(page + 1, PerPage, searchQuery),
  });

  const handlePageClick = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  const pageCount = data?.pagesCount || 0;

  const search = () => {
    queryClient.invalidateQueries({
      queryKey: ['news', 0],
    });
    setPage(0);
  };

  return (
    <div>
      <div className="flex gap-4 mb-10">
        <Input
          placeholder="#tag #lol"
          className="bg-amber-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={search}>Search</Button>
        <Button asChild>
          <Link to={getCreatePostPath()}>Create Post</Link>
        </Button>
      </div>

      <div className="pr-12 pl-12">
        {isLoading && <Spinner className="fixed top-4 right-4" />}
        {isError && <ErrorAlert />}
        {data?.data && <PostsList posts={data.data} />}

        <ReactPaginate
          breakLabel={'...'}
          onPageChange={handlePageClick}
          previousLabel={'< Previous'}
          nextLabel={'Next >'}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          className="flex gap-4 justify-end hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
