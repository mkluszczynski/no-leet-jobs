import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_APPLICATION_EDIT_KEY = 'authorizeApplicationView';
export const AuthorizeApplicationView = () =>
  SetMetadata(AUTHORIZE_APPLICATION_EDIT_KEY, true);
