import { apiClient } from '@/lib/api-client';
import type { Comment } from '@/types/comment';

interface CreateCommentDto {
  author: string;
  text: string;
  newsId: string;
}

export async function CreateCommentService(data: CreateCommentDto) {
  const res = await apiClient.post<Comment>('/comments', data);
  return res.data;
}
