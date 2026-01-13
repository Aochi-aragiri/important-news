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
import {
  ExternalLink,
  Eye,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'react-router';
export default function HomePage() {
  return (
    <div>
      <div className="flex gap-4 mb-10">
        <Input placeholder="#tag #lol" className="bg-amber-100"></Input>
        <Button asChild>
          <Link to={getCreatePostPath()}>Create Post</Link>
        </Button>
        <Select>
          <SelectTrigger className="w-45">
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
        <div className="flex justify-between bg-amber-100 gap-40 p-5 rounded-2xl mb-20">
          <div className="flex flex-col gap-5">
            <Link
              to={getPostPath('post')}
              className="text-2xl flex items-center gap-3.5"
            >
              New Title <ExternalLink />
            </Link>
            <p className="text-sm">Description of lalaalaa...</p>
            <p className="text-xm">#fun #react</p>
            <div className="flex gap-4 ">
              <p className="text-sm flex items-center justify-center gap-1">
                10 <ThumbsUp />
              </p>
              <p className="text-sm flex items-center justify-center gap-1">
                1 <ThumbsDown />
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
            <Date></Date>
            <img
              src="https://ziggyfamily.com/cdn/shop/articles/chats-blancs-3_520x500_87ce6147-95bb-47ee-853b-ad0ec37f733a.jpg?v=1767715745"
              alt="cat"
              className="w-40 h-40 object-cover rounded-xl"
            />
          </div>
        </div>
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
