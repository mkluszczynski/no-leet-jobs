import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_ACCOUNT_EDIT_KEY = 'authorizeAccountEdit';
export const AuthorizeAccountEdit = () =>
  SetMetadata(AUTHORIZE_ACCOUNT_EDIT_KEY, true);
