import { useForm } from 'react-hook-form';
import CommentsSection from './CommentsSection';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  validationSchema,
  type CommentFormData,
} from './comment-form.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCommentService } from '@/services/create-comment.service';

interface CommentFormProps {
  newsId: string;
}

export default function CommentForm({ newsId }: CommentFormProps) {
  const form = useForm<CommentFormData>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: CreateCommentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news', newsId, 'comments'] });
    },
  });

  const handleSubmit = (data: CommentFormData) => {
    mutate({ author: data.author, text: data.text, newsId });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="bg-[rgba(68,68,68,1)]">
        <div className="container mx-auto p-8 max-w-200 mt-5 flex flex-col gap-8">
          <h1 className="font-bold text-2xl text-[rgba(170,154,78,1)] ml-9 pb-1">
            Comments
          </h1>
          <Input
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your nickname..."
            aria-invalid={!!form.formState.errors.author}
            {...form.register('author')}
          />
          <Textarea
            className="bg-stone-300 rounded-none placeholder:text-stone-800"
            placeholder="Enter your comment here..."
            aria-invalid={!!form.formState.errors.text}
            {...form.register('text')}
          />
          <div className="flex flex-row-reverse border-b border-stone-400 pb-8">
            <Button
              type="submit"
              className="text-white rounded-2xl cursor-pointer"
            >
              Create comment
            </Button>
          </div>
          <CommentsSection />
        </div>
      </div>
    </form>
  );
}
