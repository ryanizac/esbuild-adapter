export function checkEmptyObject<T extends object>(object: T) {
  return Object.keys(object).length === 0;
}
