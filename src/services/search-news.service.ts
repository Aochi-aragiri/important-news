import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export async function searchNewsService(page: number, perPage: number) {
  const res = await apiClient.get<{
    page: number;
    perPage: number;
    pagesCount: number;
    totalCount: number;
    data: Post[];
  }>('/news', {
    params: { page, perPage },
  });
  return res.data;
}
