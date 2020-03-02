import { Action, ActionCreator, Middleware } from "redux";
import { get } from "lodash/fp";
import axios, { Method } from "axios";

import { startNetwork, endNetwork } from "src/actions/network.actions";

import { BASE_URL } from "src/constants/config";

export interface ApiAction extends Action {
  type: string;
  payload: {
    method: string;
    path?: string;
    baseUrl?: string;
    fullUrl?: string;
    data: any;
    onSuccess?: ActionCreator<any>;
    onError?: ActionCreator<any>;
  };
  meta: {
    api: true;
  };
}

export const apiMiddleware: Middleware = ({
  dispatch
}) => next => async action => {
  if (!get("meta.api", action)) {
    return next(action);
  }

  const { type, payload } = action as ApiAction;
  const {
    path,
    baseUrl = BASE_URL,
    fullUrl,
    onSuccess,
    onError,
    data,
    method
  } = payload;
  const url = fullUrl || new URL(path, baseUrl).toString();

  next(action);
  dispatch(startNetwork(type));

  try {
    const response = await axios({
      method: method.toUpperCase() as Method,
      url,
      [method === "get" ? "params" : "data"]: data
    });

    if (onSuccess) {
      dispatch(onSuccess(response.data));
    }
  } catch (error) {
    console.log(error);

    if (onError) {
      dispatch(onError(error));
    }
  }

  dispatch(endNetwork(type));
};

export default apiMiddleware;
