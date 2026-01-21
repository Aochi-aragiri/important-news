import z from 'zod';

export const validationSchema = z.object({
  title: z.string().min(3).max(80),
  body: z.string().min(1),
  imageUrl: z.url(),
  tags: z.string(),
});

export type PostFormData = z.infer<typeof validationSchema>;

export const defaultValues: PostFormData = {
  title: '',
  body: '',
  imageUrl: '',
  tags: '',
};
