import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function getPostService(id: string) {
  const res = await apiClient.get<Post>(`/news/${id}`);
  return res.data;
}
