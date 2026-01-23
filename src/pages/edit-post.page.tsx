import PostForm from '@/components/post-form';
import {
  defaultValues,
  validationSchema,
  type PostFormData,
} from '@/components/post-form.config';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getPostPath } from '@/constants/routes';
import { editPostService } from '@/services/edit-post.service';
import { getPostService } from '@/services/get-post.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

export default function EditPostPage() {
  const { postId } = useParams() as { postId: string };

  const form = useForm<PostFormData>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const { data } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostService(postId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        body: data.body,
        imageUrl: data.imageUrl,
        tags: data.tags,
      });
    }
  }, [data]);

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: editPostService,
  });

  const handleSubmit = (data: PostFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {isError && (
          <Alert>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}

        <PostForm backHref={getPostPath(postId)} pending={isPending} />
      </form>
    </FormProvider>
  );
}
