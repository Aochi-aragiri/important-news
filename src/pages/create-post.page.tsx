import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PostForm from '@/components/post-form';
import {
  defaultValues,
  validationSchema,
  type PostFormData,
} from '@/components/post-form.config';
import { getHomePath } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { createPostService } from '@/services/create-post.service';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router';

export default function CreatePostPage() {
  const form = useForm<PostFormData>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createPostService,
    onSuccess: () => {
      navigate(getHomePath());
    },
  });

  const handleSubmit = (data: PostFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {isError && (
          <Alert>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <PostForm backHref={getHomePath()} pending={isPending} />
      </form>
    </FormProvider>
  );
}
