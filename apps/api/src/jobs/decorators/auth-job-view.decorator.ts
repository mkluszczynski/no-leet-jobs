import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_JOB_VIEW_KEY = 'authorizeJobView';
export const AuthorizeJobView = () => SetMetadata(AUTHORIZE_JOB_VIEW_KEY, true);
