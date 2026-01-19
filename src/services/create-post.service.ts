import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

interface CreatePostDto {
  title: string;
  body: string;
  imageUrl: string;
}

export async function createPostService(data: CreatePostDto) {
  const res = await apiClient.post<Post>('/news', data);
  return res.data;
}
