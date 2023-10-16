import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header, Input, IconSearch } from "./styles";

function Search({ onFilterChange }) {
  const [filter, setFilter] = useState(""); 

  const handleFilterChange = (text) => {
    setFilter(text);
    onFilterChange(text);
  };

  return (
    <Header>
      <Input
        placeholder="Search here"
        value={filter}
        onChangeText={handleFilterChange}
      />
      <FontAwesome5 name="search" size={24} color="black" as={IconSearch} />
    </Header>
  );
}

export default Search;
