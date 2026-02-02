import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function likeCommentService(id: string) {
  const res = await apiClient.post<Post>(`/comments/${id}/like`);
  return res.data;
}
