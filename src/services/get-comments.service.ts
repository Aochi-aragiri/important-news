import { apiClient } from '@/lib/api-client';
import type { Comment } from '@/types/comment';

export async function getCommentsService(id: string) {
  const res = await apiClient.get<Comment[]>(`news/${id}/comments`);
  return res.data;
}
