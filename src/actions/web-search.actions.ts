import { ApiAction } from "src/middlewares/api.middleware";

import { WebSearchResultsState } from "src/reducers/web-search-results.reducer";

import {
  normalizeSearchWebsitesResponse,
  SearchWebsitesResponse
} from "src/normalizers/web-search.normalizers";

export const SET_WEB_SEARCH_RESULTS = "Set Web Search Results";

export const SEARCH_WEBSITES = "Search Websites";

export const setWebSearchResults = (payload: WebSearchResultsState) => ({
  type: SET_WEB_SEARCH_RESULTS,
  payload
});

export const searchWebsites = (query): ApiAction => ({
  type: SEARCH_WEBSITES,
  payload: {
    method: "get",
    fullUrl: "http://api.duckduckgo.com",
    data: {
      q: query,
      format: "json"
    },
    onSuccess: (res: SearchWebsitesResponse) =>
      setWebSearchResults(normalizeSearchWebsitesResponse(res))
  },
  meta: {
    api: true
  }
});
