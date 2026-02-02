import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function dislikeCommentService(id: string) {
  const res = await apiClient.post<Post>(`/comments/${id}/dislike`);
  return res.data;
}
