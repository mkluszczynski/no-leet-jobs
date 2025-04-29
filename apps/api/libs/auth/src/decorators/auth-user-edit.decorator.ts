import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_USER_EDIT_KEY = 'authorizeUserEdit';
export const AuthorizeUserEdit = () =>
  SetMetadata(AUTHORIZE_USER_EDIT_KEY, true);
