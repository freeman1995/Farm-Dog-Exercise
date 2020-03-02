import React, { FunctionComponent, useState } from "react";
import {
  TouchableHighlight,
  TextInput,
  View,
  Image,
  Keyboard
} from "react-native";
import styled from "styled-components/native";

const searchIcon = require("src/assets/search.png");

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  border: 1px solid crimson;
  border-radius: 100px;
  padding: 0 10px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  padding: 10px;
  font-size: 30px;
`;

const SearchIcon = styled(Image)`
  width: 40px;
  height: 40px;
`;

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBox: FunctionComponent<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <Container>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={e => onSearch(e.nativeEvent.text)}
        placeholder="Enter query"
        autoFocus={true}
      />
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          Keyboard.dismiss();
          onSearch(query);
        }}
      >
        <SearchIcon width={40} height={40} source={searchIcon} />
      </TouchableHighlight>
    </Container>
  );
};

export default SearchBox;
