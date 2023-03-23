import { PrismaClient } from '@prisma/client';
import { db } from './db';
import { checkUserToken } from '../utils/checkUserToken';

export interface Context {
  db: PrismaClient;
  user: string | object;
}

export function createContext(req: object): Context {
  const user = checkUserToken(req);

  return { db, user };
}
