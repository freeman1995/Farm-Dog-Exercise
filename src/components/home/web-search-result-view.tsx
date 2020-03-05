import React, { FunctionComponent } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import styled from "styled-components/native";

import { WebSearchResult } from "src/reducers/web-search-results.reducer";

const TouchableContainer = styled(TouchableHighlight)`
  padding: 20px 10px;
  margin: 5px;
  background-color: #fff;
`;

const Container = styled(View)`
  flex-direction: row;
`;

const Icon = styled(Image)`
  width: 45px;
  height: 45px;
  margin: 5px;
`;

const ResultText = styled(Text)`
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2
  }
});

export const WebSearchResultView: FunctionComponent<WebSearchResult> = ({
  url,
  text,
  icon
}) => (
  <TouchableContainer
    onPress={() => Linking.openURL(url)}
    underlayColor="crimson"
    style={styles.container}
  >
    <Container>
      {Boolean(icon) && <Icon source={{ uri: icon }} />}
      <ResultText>{text}</ResultText>
    </Container>
  </TouchableContainer>
);

export default WebSearchResultView;
