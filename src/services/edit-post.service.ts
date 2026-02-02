import { apiClient } from '@/lib/api-client';

interface EditPostDto {
  id: string;
  data: {
    title: string;
    body: string;
    imageUrl: string;
    tags: string;
  };
}

export async function editPostService({ id, data }: EditPostDto) {
  const res = await apiClient.patch(`/news/${id}`, data);
  return res.data;
}
