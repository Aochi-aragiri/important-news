import { generatePath } from 'react-router';

export enum RoutePaths {
  HOME = '/',
  POST = '/:postId',
  CREATE_POST = '/create-post',
  EDIT_POST = '/:postId/edit',
}

export const getHomePath = () => RoutePaths.HOME;
export const getPostPath = (postId: string) =>
  generatePath(RoutePaths.POST, {
    postId,
  });
export const getCreatePostPath = () => RoutePaths.CREATE_POST;
export const getEditPostPath = (postId: string) =>
  generatePath(RoutePaths.EDIT_POST, {
    postId,
  });
