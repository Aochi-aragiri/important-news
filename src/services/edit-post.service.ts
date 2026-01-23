import { apiClient } from '@/lib/api-client';

interface EditPostDto {
  title: string;
  body: string;
  imageUrl: string;
  tags: string;
}

export async function editPostService(data: EditPostDto) {
  const res = await apiClient.patch('/news', data);
  return res.data;
}
