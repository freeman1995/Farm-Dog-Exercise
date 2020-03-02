import React, { FunctionComponent } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { isEmpty } from "lodash/fp";
const map = require("lodash/fp/map").convert({ cap: false });

import WebSearchResultView from "src/components/web-search-result-view";

import { WebSearchResult } from "src/reducers/web-search-results.reducer";

const NoResultsTitle = styled(Text)`
  margin-top: 50px;
  font-size: 30px;
  text-align: center;
  color: crimson;
`;

const WebSearchResults = styled(View)``;

const CategorizedResultsTitle = styled(Text)`
  font-size: 35px;
  color: coral;
`;

const CategoryWebSearchResults = styled(View)``;

const Category = styled(Text)`
  padding: 5px;
  font-size: 30px;
  color: crimson;
`;

type Props = {
  generalSearchResults: WebSearchResult[];
  categorizedWebSearchResults: {
    [category: string]: WebSearchResult[];
  };
  isInitialSearch: boolean;
};

export const WebSearchResultsSection: FunctionComponent<Props> = ({
  generalSearchResults,
  categorizedWebSearchResults,
  isInitialSearch
}) => {
  if (
    !isInitialSearch &&
    !generalSearchResults.length &&
    isEmpty(categorizedWebSearchResults)
  ) {
    return <NoResultsTitle>No Results Found.</NoResultsTitle>;
  }

  return (
    <ScrollView>
      <WebSearchResults>
        {generalSearchResults.map(webSearchResult => (
          <WebSearchResultView key={webSearchResult.url} {...webSearchResult} />
        ))}
      </WebSearchResults>

      {!isEmpty(categorizedWebSearchResults) && (
        <CategorizedResultsTitle>Results by Categories</CategorizedResultsTitle>
      )}

      {map((webSearchResults, category) => (
        <CategoryWebSearchResults key={category}>
          <Category>{category}</Category>

          <WebSearchResults>
            {webSearchResults.map(webSearchResult => (
              <WebSearchResultView
                key={webSearchResult.url}
                {...webSearchResult}
              />
            ))}
          </WebSearchResults>
        </CategoryWebSearchResults>
      ))(categorizedWebSearchResults)}
    </ScrollView>
  );
};

export default WebSearchResultsSection;
