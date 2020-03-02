import React, { useCallback, useState } from "react";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import SearchBox from "src/components/search-box";
import WebSearchResultsSection from "src/components/web-search-results-section";

import {
  SEARCH_WEBSITES,
  searchWebsites
} from "src/actions/web-search.actions";

import { isLoadingSelector } from "src/selectors/network.selectors";

import { State } from "src/reducers/root.reducer";

const Container = styled(View)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  padding: 10px;
  background: #f7f7f7;
`;

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// TODO: impl search history
export const Root = () => {
  const dispatch = useDispatch();

  const {
    general: generalSearchResults,
    ...categorizedWebSearchResults
  } = useSelector((state: State) => state.webSearchResults);

  const isLoading = useSelector((state: State) =>
    isLoadingSelector(state, SEARCH_WEBSITES)
  );

  const [isInitialSearch, setIsInitialSearch] = useState(true);

  const onSearch = useCallback(
    (query: string) => {
      dispatch(searchWebsites(query));

      if (isInitialSearch) {
        setIsInitialSearch(false);
      }
    },
    [isInitialSearch]
  );

  return (
    <Container>
      <SearchBox onSearch={onSearch} />

      {isLoading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color="crimson" />
          <Text>Loading...</Text>
        </LoaderContainer>
      ) : (
        <WebSearchResultsSection
          generalSearchResults={generalSearchResults}
          categorizedWebSearchResults={categorizedWebSearchResults}
          isInitialSearch={isInitialSearch}
        />
      )}
    </Container>
  );
};

export default Root;
