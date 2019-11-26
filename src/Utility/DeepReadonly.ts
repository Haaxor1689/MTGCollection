type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
interface DeepReadonlyMap<K, V> extends ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> {}

type DeepReadonly<T> = T extends object
    ? DeepReadonlyObject<T>
    : T extends Array<infer U>
    ? DeepReadonlyArray<U>
    : T extends Map<infer K, infer V>
    ? DeepReadonlyMap<K, V>
    : T extends ReadonlyArray<infer U>
    ? DeepReadonlyArray<U>
    : T extends ReadonlyMap<infer K, infer V>
    ? DeepReadonlyMap<K, V>
    : T;
export default DeepReadonly;
