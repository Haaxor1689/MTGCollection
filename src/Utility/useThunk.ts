import React from "react";

export const useThunk = <StateT, DispatchT, Func>(
    context: React.Context<[StateT, React.Dispatch<DispatchT>]>,
    func: (dispatch: React.Dispatch<DispatchT>, state: StateT) => Func
) => {
    const [state, dispatch] = React.useContext(context);
    return func(dispatch, state);
};
export default useThunk;
