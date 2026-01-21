import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PostForm from '@/components/post-form';
import {
  defaultValues,
  validationSchema,
  type PostFormData,
} from '@/components/post-form.config';
import { getHomePath } from '@/constants/routes';

export default function CreatePostPage() {
  const form = useForm<PostFormData>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = (data: PostFormData) => {
    /* TODO:
      1. Створити мутацію для обробки запиту на АПІ для створення поста (useMutation)
      2. Викликати мутацію ось тут
      3*. Обробити статус завантаження і помилки
    */
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <PostForm backHref={getHomePath()} />
      </form>
    </FormProvider>
  );
}
