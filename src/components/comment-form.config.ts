import z from 'zod';

export const validationSchema = z.object({
  author: z.string().min(2).max(80),
  text: z.string().min(2).max(248),
});

export type CommentFormData = z.infer<typeof validationSchema>;

export const defaultValues: CommentFormData = {
  author: '',
  text: '',
};
