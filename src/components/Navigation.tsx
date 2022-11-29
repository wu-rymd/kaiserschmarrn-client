import {
  Box,
  Button,
  Input,
  SideNavigation,
  TextContent,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { CopyText } from ".";

export function Navigation(props: any) {
  const navigate = useNavigate();

  const navHeader = {
    text: `${props.client ? props.client.clientId : "Client"}`,
    href: "/",
  };
  const navItems = [
    {
      type: "section",
      text: "Admin View",
      items: [
        { type: "link", text: "Accounts", href: "/accounts" },
        { type: "link", text: "Stocks", href: "/stocks" },
        { type: "link", text: "NFTs", href: "/nfts" },
        { type: "link", text: "Cryptos", href: "/cryptos" },
        { type: "link", text: "Assets", href: "/assets" },
        { type: "link", text: "Transactions", href: "/transactions" },
      ],
    },
    {
      type: "section",
      text: "User View",
      items: [{ type: "link", text: "Invest in stocks", href: "/invest" }],
    },
    {
      type: "divider",
    },
    {
      type: "link",
      text: "Client's API Key:",
      info: (
        <Box margin={"n"} display="block" color="text-body-secondary">
          <CopyText
            //copyText={`${props.accessToken}`}
            copyText={<Input readOnly value={props.accessToken} />}
            copyButtonLabel="Copy API Key"
            successText="API Key copied"
            errorText="API Key failed to copy"
          />
        </Box>
      ),
    },
    {
      type: "link",
      text: (
        <Button
          onClick={() => {
            props.setAccessToken("");
            navigate("/");
          }}
        >
          Sign out
        </Button>
      ),
    },
  ];

  let items = props.items;
  items = navItems;
  return (
    <SideNavigation
      items={items}
      header={navHeader}
      activeHref={props.activeHref}
      /*onFollow={defaultOnFollowHandler}*/
    />
  );
}
