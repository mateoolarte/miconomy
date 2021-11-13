export function checkEnv(): boolean {
  const hasWindow = typeof window !== 'undefined';

  if (hasWindow) {
    return true;
  }

  return false;
}
