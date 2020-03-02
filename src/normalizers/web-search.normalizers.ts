import {
  WebSearchResult,
  WebSearchResultsState
} from "reducers/web-search-results.reducer";

type SearchResultEntity = {
  FirstURL: string;
  Text: string;
  Icon: { Height: string; Width: string; URL: string };
};

type CategorySearchResults = {
  Name: string;
  Topics: SearchResultEntity[];
};

export type SearchWebsitesResponse = {
  RelatedTopics: Array<SearchResultEntity | CategorySearchResults>;
};

const formatSearchResultEntity = (
  searchResultEntity: SearchResultEntity
): WebSearchResult => ({
  url: searchResultEntity.FirstURL,
  text: searchResultEntity.Text,
  icon: searchResultEntity.Icon.URL
});

export const normalizeSearchWebsitesResponse = (
  res: SearchWebsitesResponse
): WebSearchResultsState =>
  res.RelatedTopics.reduce(
    (webSearchResults, currentItem) => {
      if ((currentItem as CategorySearchResults).Name) {
        const categorySearchResults = currentItem as CategorySearchResults;

        return {
          ...webSearchResults,
          [categorySearchResults.Name]: categorySearchResults.Topics.map(
            formatSearchResultEntity
          )
        };
      }

      return {
        ...webSearchResults,
        general: [
          ...webSearchResults.general,
          formatSearchResultEntity(currentItem as SearchResultEntity)
        ]
      };
    },
    { general: [] }
  );
