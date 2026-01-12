import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/home.page';
import RootLayout from '@/layout/root-layout';
import PostPage from '@/pages/post.page';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        // TODO: Replace Id with id
        path: '/post/:Id',
        element: <PostPage />,
      },
    ],
  },
]);
