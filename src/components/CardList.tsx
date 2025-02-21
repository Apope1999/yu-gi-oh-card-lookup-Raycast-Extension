import { List, ActionPanel, Action } from "@raycast/api";
import { CardDetail } from "./CardDetail";
import { Card } from "../types/Card";
import { useState } from "react";


export function CardList({ isLoading, data, searchText, setSearchText }: any) {

  const [selectedType, setSelectedType] = useState("All");

  // Filter the data based on the selected type
  const filteredData = selectedType === "All" ? data : data?.filter((card: Card) => card.type === selectedType);

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search Card..."
      searchText={searchText}
      onSearchTextChange={setSearchText}
      throttle
    >
      {filteredData?.map((card: Card) => (
        <List.Item
          key={card.id}
          title={card.name}
          actions={
            <ActionPanel>
              <Action.Push title="Show Card Details" target={<CardDetail card={card} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
