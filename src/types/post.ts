export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  imageUrl: string;
  title: string;
  likes: number;
  dislikes: number;
  tags: string;
}
