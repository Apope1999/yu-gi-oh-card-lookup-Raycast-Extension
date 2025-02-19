import { useState } from "react";
import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

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
    <List isLoading={isLoading} searchBarPlaceholder={"Search Card..."} searchText={searchText} onSearchTextChange={setSearchText} throttle>
      {data?.map((card) => (
        <List.Item key={card.id} title={card.name} />
      ))}
    </List>
  );
}
