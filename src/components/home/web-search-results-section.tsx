import React, { FunctionComponent, useMemo } from "react";
import { useSelector } from "react-redux";
import { Text, SectionList } from "react-native";
import styled from "styled-components/native";
import { isEmpty } from "lodash/fp";
const map = require("lodash/fp/map").convert({ cap: false });

import WebSearchResultView from "src/components/home/web-search-result-view";

import { WebSearchResult } from "src/reducers/web-search-results.reducer";
import { State } from "src/reducers/root.reducer";

const NoResultsTitle = styled(Text)`
  margin-top: 50px;
  font-size: 30px;
  text-align: center;
  color: crimson;
`;

const Category = styled(Text)`
  padding: 5px;
  font-size: 30px;
  color: crimson;
  text-transform: capitalize;
`;

type Props = {
  isInitialSearch: boolean;
};

export const WebSearchResultsSection: FunctionComponent<Props> = ({
  isInitialSearch
}) => {
  const webSearchResults = useSelector(
    (state: State) => state.webSearchResults
  );

  const searchResultSections = useMemo(
    () =>
      map((webSearchResults, category) => ({
        title: category,
        data: webSearchResults
      }))(webSearchResults),
    [webSearchResults]
  );

  if (!isInitialSearch && isEmpty(webSearchResults)) {
    return <NoResultsTitle>No Results Found.</NoResultsTitle>;
  }

  return (
    <SectionList<WebSearchResult>
      sections={searchResultSections}
      keyExtractor={webSearchResult => webSearchResult.url}
      renderSectionHeader={({ section: { title: category } }) => (
        <Category>{category}</Category>
      )}
      renderItem={({ item: webSearchResult }) => (
        <WebSearchResultView key={webSearchResult.url} {...webSearchResult} />
      )}
    />
  );
};

export default WebSearchResultsSection;
