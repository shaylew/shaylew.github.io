export * from '../../graphql.gen';

export type NullToUndefined<T> = T extends null ? undefined : T;

export type NullFieldsToUndefined<T> = {
  [K in keyof T]: NullToUndefined<T[K]>;
};

export function nullToPartial<T>(obj: T): NullFieldsToUndefined<T> {
  const r = {} as NullFieldsToUndefined<T>;
  for (const k in obj) {
    const v = obj[k];
    if (v === null) {
      r[k] = undefined as NullToUndefined<T[typeof k]>;
    } else {
      r[k] = v as NullToUndefined<T[typeof k]>;
    }
  }
  return r;
}
