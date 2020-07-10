export * from '../../graphql.gen';

export type NotNull<T> = T extends null ? undefined : T;

export type NullToPartial<T> = {
  [K in keyof T]: NotNull<T[K]>;
};

export function nullToPartial<T>(obj: T): NullToPartial<T> {
  const r = {} as NullToPartial<T>;
  for (const k in obj) {
    const v = obj[k];
    if (v === null) {
      r[k] = undefined as NotNull<T[typeof k]>;
    } else {
      r[k] = v as NotNull<T[typeof k]>;
    }
  }
  return r;
}
