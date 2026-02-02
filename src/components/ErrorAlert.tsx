import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertTitle className="text-2xl font-bold">Page Not Found "^"</AlertTitle>
      <AlertDescription>
        Sorry, there's some problem with your post
      </AlertDescription>
    </Alert>
  );
}
