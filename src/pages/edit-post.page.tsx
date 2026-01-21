import PostForm from '@/components/post-form';
import {
  defaultValues,
  validationSchema,
  type PostFormData,
} from '@/components/post-form.config';
import { getPostPath } from '@/constants/routes';
import { getPostService } from '@/services/get-post.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
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

  const handleSubmit = (data: PostFormData) => {
    /* TODO:
        1. Створити мутацію для обробки запиту на АПІ для оновлення поста (useMutation)
        2. Викликати мутацію ось тут
        3*. Обробити статус завантаження і помилки
      */
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <PostForm backHref={getPostPath('post')} />
      </form>
    </FormProvider>
  );
}
