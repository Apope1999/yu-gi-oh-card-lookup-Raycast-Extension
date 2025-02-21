import { Detail } from "@raycast/api";
import { Card } from "../types/Card";

export function CardDetail({ card }: { card: Card }) {
  return (
    <Detail
      markdown={`# ${card.name}
  ${card.desc}  
  **Type**: ${card.type}  
  **ATK/DEF**: ${card.atk}/${card.def}  
  **Level**: ${card.level}  
  **Attribute**: ${card.attribute}  
  **Archetype**: ${card.archetype}  
  **[More Info](${card.ygoprodeck_url})**  
  `}
    />
  );
}