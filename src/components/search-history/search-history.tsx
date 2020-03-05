import React from "react";
import { StatusBar, View, ScrollView, Text } from "react-native";
import { Link } from "react-router-native";
import styled from "styled-components/native";
import qs from "qs";

import { LinkText } from "src/components/common/styled";

import { usePersistentState } from "src/hooks/use-persistent-state";

const Container = styled(View)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  padding: 10px;
  background: #f7f7f7;
`;

const HistoryList = styled(ScrollView)`
  margin-top: 10px;
`;

const HistoryRecordLinkText = styled(Text)`
  color: coral;
`;

export type SearchHistoryRecord = {
  timeStamp: number;
  query: string;
};

export const SearchHistory = () => {
  const [searchHistory] = usePersistentState<SearchHistoryRecord[]>(
    "searchHistory",
    []
  );

  return (
    <Container>
      <Link to="/">
        <LinkText>Go Back to Search</LinkText>
      </Link>

      <HistoryList>
        {searchHistory.map(({ timeStamp, query }) => (
          <Link
            key={timeStamp}
            to={{
              pathname: "/",
              search: qs.stringify({ query }, { addQueryPrefix: true })
            }}
          >
            <HistoryRecordLinkText>{query}</HistoryRecordLinkText>
          </Link>
        ))}
      </HistoryList>
    </Container>
  );
};

export default SearchHistory;
