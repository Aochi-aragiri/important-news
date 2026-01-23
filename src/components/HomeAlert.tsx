import { Alert } from './ui/alert';

export function ErrorAlert() {
  return (
    <Alert className="flex justify-center text-2xl">Failed to load posts</Alert>
  );
}
