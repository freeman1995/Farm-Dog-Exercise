export const START_NETWORK = "[network] Start";
export const END_NETWORK = "[network] End";

export const startNetwork = (networkLabel: string) => ({
  type: START_NETWORK,
  payload: {
    networkLabel
  }
});

export const endNetwork = (networkLabel: string) => ({
  type: END_NETWORK,
  payload: {
    networkLabel
  }
});
