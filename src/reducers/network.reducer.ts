import { set } from "lodash/fp";
import { handleActions } from "redux-actions";

import * as actions from "src/actions/network.actions";

const initialState = {};

type NetworkState = {
  [networkLabel: string]: number;
};

const networkReducer = handleActions<NetworkState, any>(
  {
    [actions.START_NETWORK](
      state,
      action: ReturnType<typeof actions.startNetwork>
    ) {
      const { networkLabel } = action.payload;

      return set(
        [networkLabel],
        state[networkLabel] ? state[networkLabel] + 1 : 1,
        state
      );
    },

    [actions.END_NETWORK](
      state,
      action: ReturnType<typeof actions.endNetwork>
    ) {
      const { networkLabel } = action.payload;

      return set(
        [networkLabel],
        state[networkLabel] ? state[networkLabel] - 1 : 0,
        state
      );
    }
  },
  initialState
);

export default networkReducer;
