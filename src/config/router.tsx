import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/home.page';
import RootLayout from '@/layout/root-layout';
import EditPostPage from '@/pages/edit-post.page';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/editPost',
        element: <EditPostPage />,
      },
    ],
  },
]);
