export function cleanGraphqlObj(obj: any): any {
  if (obj) {
    const cleanedObj = { ...obj };

    delete cleanedObj['__typename'];
    return cleanedObj;
  }

  return obj;
}
