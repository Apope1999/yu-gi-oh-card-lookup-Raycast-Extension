import { Action, ActionPanel, Detail } from "@raycast/api";
import { Card } from "../types/Card";

export function NormalMonsterDetail({ card }: { card: Card }) {
    return (
        <Detail
          markdown={`# ${card.name}\n## Card Text\n ${card.desc}\n \n[${Array.isArray(card.typeline) ? card.typeline.map(type => `**${type}**`).join("/") : `**${card.typeline}**`}]\n *** \n ## Card Price\n ${card.card_prices!
            .map(price => {
                return `- **Cardmarket**: $${price.cardmarket_price}\n- **TCGPlayer**: $${price.tcgplayer_price}\n- **eBay**: $${price.ebay_price}\n- **Amazon**: $${price.amazon_price}\n- **CoolStuffInc**: $${price.coolstuffinc_price}
                `.trim();
            })
            .join("\n")}`}
          navigationTitle={`${card.name}`}
          metadata={
            <Detail.Metadata>
              <Detail.Metadata.Label title="Attack" text={`${card.atk}`} />
              <Detail.Metadata.Label title="Defense" text={`${card.def}`} />
              <Detail.Metadata.Separator />
              <Detail.Metadata.Label title="Level" text={`${card.level}`} />
              <Detail.Metadata.Label title="Attribute" text={`${card.attribute}`} />
              <Detail.Metadata.Label title="Archetype" text={`${card.archetype}`} />
            </Detail.Metadata>
          }
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="View in YGOProDeck" url={`${card.ygoprodeck_url}`} />
            </ActionPanel>
          }
        />
      );
}