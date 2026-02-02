import { format } from 'date-fns';
import Markdown from 'react-markdown';

interface PostDataProps {
  title: string;
  createdAt: string;
  body: string;
  imageUrl: string;
  tags: string;
}

export default function PostData({
  title,
  createdAt,
  body,
  imageUrl,
  tags,
}: PostDataProps) {
  return (
    <div className="flex gap-8 p-9 justify-between min-h-50">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-5 border-b pb-2 border-black">
          <h2 className="font-bold text-2xl">{title}</h2>
          <time className="text-stone-600" dateTime={createdAt}>
            {format(createdAt, 'MMM d, yyyy')}
          </time>
        </div>
        <p className="prose">
          <Markdown>{body}</Markdown>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="max-w-80 max-h-92 flex justify-center bg-stone-300 items-center">
          <img src={imageUrl} alt={title} />
        </div>
        <p className="text-black font-medium">{tags}</p>
      </div>
    </div>
  );
}
