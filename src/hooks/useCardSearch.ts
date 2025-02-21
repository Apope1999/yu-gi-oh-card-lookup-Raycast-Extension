import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { Card } from "../types/Card";

export function useCardSearch() {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data } = useFetch<Card[]>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchText}`, {
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
  });

  return { isLoading, data, searchText, setSearchText };
}