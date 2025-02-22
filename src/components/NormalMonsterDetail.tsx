import { Action, ActionPanel, Detail } from "@raycast/api";
import { Card } from "../types/Card";

export function NormalMonsterDetail({ card }: { card: Card }) {
    return (
        <Detail
          markdown={`# ${card.name}\n## Card Text\n ${card.desc}`}
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