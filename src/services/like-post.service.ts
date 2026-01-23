import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function likePostService(id: string) {
  const res = await apiClient.post<Post>(`/news/${id}/like`);
  return res.data;
}
