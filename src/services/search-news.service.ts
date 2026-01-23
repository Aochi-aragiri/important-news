import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types/post';

export interface PostWithComments extends Post {
  comments: object[];
}

export async function searchNewsService(page: number, perPage: number) {
  const res = await apiClient.get<{
    page: number;
    perPage: number;
    pagesCount: number;
    totalCount: number;
    data: PostWithComments[];
  }>('/news', {
    params: { page, perPage },
  });
  return res.data;
}
