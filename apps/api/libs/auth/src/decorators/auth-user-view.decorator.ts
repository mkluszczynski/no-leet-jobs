import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_USER_VIEW_KEY = 'authorizeUserView';
export const AuthorizeUserView = () =>
  SetMetadata(AUTHORIZE_USER_VIEW_KEY, true);
