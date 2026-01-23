import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function dislikePostService(id: string) {
  const res = await apiClient.post<Post>(`/news/${id}/dislike`);
  return res.data;
}
