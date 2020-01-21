export const ArrayChunk = <T>(arr: T[], n: number): T[][] => (arr.length <= n ? [arr] : [arr.slice(0, n)].concat(ArrayChunk(arr.slice(n), n)));

export const Arr = {
    Unique: <T>(v: T, i: number, self: T[]) => self.indexOf(v) === i,
    NotNull: <T>(v: T) => v !== null && v !== undefined,
};

export const MakeTuple = <T extends string[]>(...args: T) => args;

export const combineReducers = <State, Action>(reducers: { [P in keyof State]: (state: State[P], action: Action) => State[P] }) => {
    return (state: State, action: Action) => {
        const temp: State = {} as any;
        for (const i in reducers) {
            temp[i] = reducers[i](state[i], action);
        }
        return temp;
    };
};

export const PxFromAvatarSize = (size?: "chip" | "inline") => {
    switch (size) {
        case "chip":
            return 9;
        case "inline":
            return 12;
        case undefined:
            return 24;
    }
};
