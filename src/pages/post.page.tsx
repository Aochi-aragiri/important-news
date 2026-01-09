import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit, Trash } from 'lucide-react';
import likeIcon from '../img/like.svg';
import dislikeIcon from '../img/dislike.svg';
import comment from '../img/comment.svg';
import eye from '../img/eye.svg';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function PostPage() {
  return (
    <div>
      <div className="container mx-auto p-8 max-w-200">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button className="bg-stone-300 rounded-none text-black">
            <ChevronLeft></ChevronLeft>All news
          </Button>
          <div className="flex gap-4">
            <Button className="size-9 text-black">
              <Edit></Edit>
            </Button>
            <Button className="size-9 text-black bg-[rgba(213,114,114,1)]">
              <Trash></Trash>
            </Button>
          </div>
        </div>
        {/* /Navigation */}

        {/* Content section */}
        <div className="flex gap-8 p-9">
          <div>
            <div className="flex justify-between items-center mb-5 border-b pb-2 border-black">
              <h2 className="font-bold text-2xl">News Title</h2>
              <data className="text-stone-600">00.00.0000</data>
            </div>
            <p>
              text text text text text text text text text text text text text
              text text text text text text text text text text text text text
              text text text text text text text text text text text text text
              text text text text text
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-80 h-92 flex justify-center bg-stone-300 items-center">
              <img src="" alt="Image" />
            </div>
            <p className="text-black font-medium">#tags #tags</p>
          </div>
        </div>
        {/* /Content section */}

        {/* Community section */}
        <div className="flex items-center justify-between">
          {/* Like and dislikes */}
          <div className="flex items-center gap-6 ml-9">
            <div className="flex items-center gap-1 text-[rgba(170,154,78,1)]">
              9
              <img src={likeIcon} alt="likes" />
            </div>
            <div className="flex items-center gap-1 text-[rgba(170,154,78,1)] ">
              1
              <img src={dislikeIcon} alt="dislikes" />
            </div>
          </div>
          {/* /Like and dislikes */}
          {/* Views and Comments */}
          <div className="flex items-center gap-6 ml-9">
            <div className="flex items-center gap-1">
              194
              <img src={eye} alt="eye" />
            </div>
            <div className="flex items-center gap-1">
              2
              <img src={comment} alt="comment" />
            </div>
          </div>
          {/* /Views and Comments */}
        </div>
      </div>
      {/* /Community section */}
      {/* Comments section */}
      <div className="bg-[rgba(68,68,68,1)]">
        <div className="container mx-auto p-8 max-w-200 mt-5 flex flex-col gap-8 ">
          <h1 className="font-bold text-2xl text-[rgba(170,154,78,1)] ml-9 pb-1">
            Comments
          </h1>
          {/* Create comment section */}
          <Input
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your nickname..."
          ></Input>
          <Textarea
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your comment here..."
          ></Textarea>
          <div className="flex flex-row-reverse border-b border-stone-400 pb-8">
            <Button className="text-white rounded-2xl">Create comment</Button>
          </div>

          {/* /Create comment section */}
          {/* Comments view section */}
          <div className="bg-white rounded-2xl p-7">
            <div className="flex justify-between pb-3">
              <h6 className="font-bold text-black">UserName</h6>
              <data className="text-stone-600">00.00.0000</data>
            </div>
            <p>text text text text text text text text text </p>
            <div className="flex items-center gap-6 pl-2 pt-4">
              <div className="flex items-center gap-1 text-[rgba(170,154,78,1)]">
                2
                <img src={likeIcon} alt="likes" />
              </div>
              <div className="flex items-center gap-1 text-[rgba(170,154,78,1)] ">
                <img src={dislikeIcon} alt="dislikes" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between pb-3">
              <h6 className="font-bold text-black">UserName2</h6>
              <data className="text-stone-600">00.00.0000</data>
            </div>
            <p>
              text text text text text text text text text text text text text
              text text text text text text text text text text text text text
              text text text text text text text text text text text text text
              text text text text text text text text text
            </p>
            <div className="flex items-center gap-6 pl-2 pt-4">
              <div className="flex items-center gap-1 text-[rgba(170,154,78,1)]">
                <img src={likeIcon} alt="likes" />
              </div>
              <div className="flex items-center gap-1 text-[rgba(170,154,78,1)] ">
                1
                <img src={dislikeIcon} alt="dislikes" />
              </div>
            </div>
          </div>
          {/* /Comments view section */}
        </div>
      </div>
      {/* /Comments section */}
    </div>
  );
}
