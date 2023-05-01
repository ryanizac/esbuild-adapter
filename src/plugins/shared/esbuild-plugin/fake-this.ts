export class FakeThis<T extends object> {
  constructor(initialThis: T) {
    Object.assign(this, initialThis);
  }

  setProperty(key: string, value: any) {
    Object.defineProperty(this, key, {
      value,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }

  getProperty(key: string) {
    return this[key as keyof typeof this];
  }
}
