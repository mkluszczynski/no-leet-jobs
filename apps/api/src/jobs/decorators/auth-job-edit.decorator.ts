import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_JOB_EDIT_KEY = 'authorizeJobEdit';
export const AuthorizeJobEdit = () => SetMetadata(AUTHORIZE_JOB_EDIT_KEY, true);
