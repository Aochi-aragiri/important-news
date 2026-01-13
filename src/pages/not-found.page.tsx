import { Button } from '@/components/ui/button';
import { getHomePath } from '@/constants/routes';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-[#AA9A4E] font-bold gap-4">
      <p className="text-6xl ">404</p>
      <h3 className="text-4xl">Page not found</h3>
      <p className="text-stone-500">The link might be corrupted</p>
      <Button asChild>
        <Link to={getHomePath()}>Go home</Link>
      </Button>
    </div>
  );
}
