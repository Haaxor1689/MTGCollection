export const ArrayChunk = <T>(arr: T[], n: number): T[][] => (arr.length <= n ? [arr] : [arr.slice(0, n)].concat(ArrayChunk(arr.slice(n), n)));

export const Arr = {
    Unique: <T>(v: T, i: number, self: T[]) => self.indexOf(v) === i,
    NotNull: <T>(v: T) => v !== null && v !== undefined,
};
