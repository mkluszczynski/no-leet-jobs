import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_ACCOUNT_VIEW_KEY = 'authorizeAccountView';
export const AuthorizeAccountView = () =>
  SetMetadata(AUTHORIZE_ACCOUNT_VIEW_KEY, true);
