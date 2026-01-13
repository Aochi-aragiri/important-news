import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/home.page';
import RootLayout from '@/layout/root-layout';
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
        path: RoutePaths.POST,
        element: <PostPage />,
      },
      /*       {
        path: RoutePaths.CREATE_POST,
        element: <CreatePage />,
      },
      {
        path: RoutePaths.EDIT_POST,
        element: <EditPage />,
      }, */
    ],
  },
]);
