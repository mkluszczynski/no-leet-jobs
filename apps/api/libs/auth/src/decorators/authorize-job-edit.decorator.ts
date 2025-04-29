import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_JOB_EDIT = 'authorizeJobEdit';
export const AuthorizeJobEdit = () => SetMetadata(AUTHORIZE_JOB_EDIT, true);
