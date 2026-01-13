import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/home.page';
import RootLayout from '@/layout/root-layout';
import EditPostPage from '@/pages/edit-post.page';
import PostPage from '@/pages/post.page';
import { RoutePaths } from '@/constants/routes';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <HomePage />,
      },
      {
        path: RoutePaths.EDIT_POST,
        element: <EditPostPage />,
      },
      {
        path: RoutePaths.POST,
        element: <PostPage />,
      },
    ],
  },
]);
