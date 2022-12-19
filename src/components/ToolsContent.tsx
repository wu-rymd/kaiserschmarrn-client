import { HelpPanel, Icon, Link } from "@cloudscape-design/components";

export const ExternalLinkItem = ({ href, text }: { href: any; text: any }) => (
  <Link href={href} target="_blank">
    {text}
  </Link>
);

export const ToolsContent = () => (
  <HelpPanel
    header={<h2>Kaiserschmarrn Client</h2>}
    footer={
      <>
        <h3>
          Code & Docs{" "}
          <span role="img" aria-label="Icon external Link">
            <Icon name="external" />
          </span>
        </h3>
        <ul>
          <li>
            <ExternalLinkItem
              href="https://github.com/wu-rymd/kaiserschmarrn"
              text="GitHub Repo - Server"
            />
          </li>
          <li>
            <ExternalLinkItem
              href="https://github.com/wu-rymd/kaiserschmarrn-client"
              text="GitHub Repo - Client"
            />
          </li>
          <li>
            <ExternalLinkItem
              href="https://app.swaggerhub.com/apis-docs/BORAELCI/kaiserschmarrn/v0"
              text="API Documentation - Swagger"
            />
          </li>
        </ul>
      </>
    }
  >
    <p>Manage trading accounts</p>
  </HelpPanel>
);
