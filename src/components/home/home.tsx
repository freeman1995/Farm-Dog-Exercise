import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, ActivityIndicator } from "react-native";
import { Link, RouteComponentProps } from "react-router-native";
import styled from "styled-components/native";
import qs from "qs";

import SearchBox from "src/components/home/search-box";
import WebSearchResultsSection from "src/components/home/web-search-results-section";

import { State } from "src/reducers/root.reducer";
import { SearchHistoryRecord } from "src/components/search-history/search-history";

import {
  SEARCH_WEBSITES,
  searchWebsites
} from "src/actions/web-search.actions";

import { isLoadingSelector } from "src/selectors/network.selectors";

import { usePersistentState } from "src/hooks/use-persistent-state";
import { LinkText } from "src/components/common/styled";

const Container = styled(View)`
  flex: 1;
  padding: 10px;
  background: #f7f7f7;
`;

const SearchHistoryLink = styled(Link)`
  margin: 15px 0;
`;

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Home: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: State) =>
    isLoadingSelector(state, SEARCH_WEBSITES)
  );

  const [isInitialSearch, setIsInitialSearch] = useState(true);

  const [searchHistory, setSearchHistory] = usePersistentState<
    SearchHistoryRecord[]
  >("searchHistory", []);

  const initialQuery = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }).query,
    []
  );

  const onSearch = useCallback(
    (query: string) => {
      if (query) {
        dispatch(searchWebsites(query));

        setSearchHistory([
          {
            timeStamp: Date.now(),
            query
          },
          ...searchHistory
        ]);

        if (isInitialSearch) {
          setIsInitialSearch(false);
        }
      }
    },
    [isInitialSearch, searchHistory]
  );

  return (
    <Container>
      <SearchBox onSearch={onSearch} initialQuery={initialQuery} />

      <SearchHistoryLink to="search-history">
        <LinkText>View Search History</LinkText>
      </SearchHistoryLink>

      {isLoading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color="crimson" />
          <Text>Loading...</Text>
        </LoaderContainer>
      ) : (
        <WebSearchResultsSection isInitialSearch={isInitialSearch} />
      )}
    </Container>
  );
};

export default Home;
