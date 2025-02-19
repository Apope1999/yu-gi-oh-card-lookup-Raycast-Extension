import { useState } from "react";
import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

type CardType = {
  id: string;
  name: string;
}

function CardTypeDropdown(props: { cardTypes: CardType[]; onCardTypeChange: (newValue: string) => void }) {
  const { cardTypes, onCardTypeChange } = props;
  return (
    <List.Dropdown
      tooltip="Select Card Type"
      storeValue={true}
      onChange={(newValue) => {
        onCardTypeChange(newValue);
      }}
    >
      <List.Dropdown.Section title="Cards">
        {cardTypes.map((cardType) => (
          <List.Dropdown.Item key={cardType.id} title={cardType.name} value={cardType.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
}

type Card = {
  id: string;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  archetype: string;
  ygoprodeck_url: string;
}

export default function Command() {

  const cardTypes: CardType[] = [
    { id: "1", name: "All" },
    { id: "2", name: "Monster" },
    { id: "3", name: "Dark Magician" },
  ];

  const onCardTypeChange = (newValue: string) => {
    console.log(newValue);
  };


  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useFetch<Card[]>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchText}`,
  {
    keepPreviousData: true,
    execute: searchText.trim().length > 3,
    parseResponse: async (response) => {
      const json = await response.json();
      return json.data ?? [];
    },
    mapResult: (result) => ({
      data: result.map((card) => ({
        id: card.id.toString(),
        name: card.name,
        type: card.type,
        desc: card.desc,
        atk: card.atk,
        def: card.def,
        level: card.level,
        attribute: card.attribute,
        archetype: card.archetype || "N/A",
        ygoprodeck_url: card.ygoprodeck_url,
      })),
    }),
  }
);


  console.log(data)

  return (
    <List
     isLoading={isLoading}
     searchBarPlaceholder={"Search Card..."} 
     searchText={searchText} 
     onSearchTextChange={setSearchText} 
     throttle
     searchBarAccessory={<CardTypeDropdown cardTypes={cardTypes} onCardTypeChange={onCardTypeChange} />}
     >
      {data?.map((card) => (
        <List.Item key={card.id} title={card.name} />
      ))}
    </List>
  );
}
