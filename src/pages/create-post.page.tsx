import { Button } from '@/components/ui/button';
import { getHomePath } from '@/constants/routes';
import { Link } from 'react-router';

export default function CreatePostPage() {
  return (
    <div className="flex flex-col gap-3 items-baseline">
      There`s empty here ^^
      <Button asChild className="text-white">
        <Link to={getHomePath()}>Go home</Link>
      </Button>
    </div>
  );
}
