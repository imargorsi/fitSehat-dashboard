export function lazySingleton<T extends object>(create: () => T): T {
  let instance: T | undefined;

  return new Proxy({} as T, {
    get(_target, prop, receiver) {
      instance ??= create();
      const value = Reflect.get(instance, prop, receiver);
      if (typeof value === "function") {
        return value.bind(instance);
      }
      return value;
    },
  });
}
