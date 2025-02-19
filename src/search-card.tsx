import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

export default function Command() {

  const { isLoading, data, revalidate } = useFetch<SearchResponse>("https://db.ygoprodeck.com/api/v7/cardinfo.php?%20&fname=Pendulum")

  console.log(data)

  return (
    <List>
      <List.Item
        icon={Icon.Bird}
        title="Greeting"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
