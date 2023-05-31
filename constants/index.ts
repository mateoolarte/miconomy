const DEFAULT_API_URL = '/api/graphql';

export const USER_TOKEN_KEY = 'userToken';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
export const SSR_MODE = typeof window === 'undefined';
