import { createSelector } from "reselect";

import { State } from "src/reducers/root.reducer";

export const isLoadingSelector = createSelector(
  (state: State) => state.network,
  (state: State, networkLabel: string) => networkLabel,
  (network, networkLabel) => network[networkLabel] > 0
);
