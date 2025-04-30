import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_APPLICATION_EDIT_KEY = 'authorizeApplicationEdit';
export const AuthorizeApplicationEdit = () =>
  SetMetadata(AUTHORIZE_APPLICATION_EDIT_KEY, true);
