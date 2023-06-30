import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_API';
export const PublicAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
