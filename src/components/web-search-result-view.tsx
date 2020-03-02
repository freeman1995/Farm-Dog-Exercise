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

const Container = styled(TouchableHighlight)`
  padding: 20px 10px;
  margin: 5px;
  background-color: #fff;
`;

const Icon = styled(Image)`
  width: 45px;
  height: 45px;
  padding: 5px;
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
  <Container
    onPress={() => Linking.openURL(url)}
    underlayColor="crimson"
    style={styles.container}
  >
    <View>
      {Boolean(icon) && <Icon source={{ uri: icon }} />}
      <Text>{text}</Text>
    </View>
  </Container>
);

export default WebSearchResultView;
