import { ApiAction } from "src/middlewares/api.middleware";

import { WebSearchResultsState } from "src/reducers/web-search-results.reducer";

import {
  SearchWebsitesResponse,
  formatSearchWebsitesResponse
} from "src/response-formatters/web-search.response-formatters";

export const SET_WEB_SEARCH_RESULTS = "Set Web Search Results";

export const SEARCH_WEBSITES = "Search Websites";

export const setWebSearchResults = (
  webSearchResults: WebSearchResultsState
) => ({
  type: SET_WEB_SEARCH_RESULTS,
  payload: {
    webSearchResults
  }
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
      setWebSearchResults(formatSearchWebsitesResponse(res))
  },
  meta: {
    api: true
  }
});
