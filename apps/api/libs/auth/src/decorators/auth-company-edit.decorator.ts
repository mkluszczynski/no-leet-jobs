import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_COMPANY_EDIT_KEY = 'authorizeCompanyEdit';
export const AuthorizeJobEdit = () =>
  SetMetadata(AUTHORIZE_COMPANY_EDIT_KEY, true);
