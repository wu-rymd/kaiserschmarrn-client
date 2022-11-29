import { AppLayout } from "@cloudscape-design/components";
import { ToolsContent } from ".";

export const appLayoutLabels = {
  navigation: "Side navigation",
  navigationToggle: "Open side navigation",
  navigationClose: "Close side navigation",
  notifications: "Notifications",
  tools: "Help panel",
  toolsToggle: "Open help panel",
  toolsClose: "Close help panel",
};

export function TableLayout(props: any) {
  return (
    <AppLayout
      {...props}
      headerSelector="#header"
      ariaLabels={appLayoutLabels}
      tools={<ToolsContent />}
      onNavigationChange={(event) => {
        if (props.onNavigationChange) {
          props.onNavigationChange(event);
        }
      }}
      onToolsChange={(event) => {
        if (props.onToolsChange) {
          props.onToolsChange(event);
        }
      }}
    />
  );
}
