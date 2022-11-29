import { HelpPanel, Icon, Link } from '@cloudscape-design/components';

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
          Code & Docs{' '}
          <span role="img" aria-label="Icon external Link">
            <Icon name="external" />
          </span>
        </h3>
        <ul>
          <li>
            <ExternalLinkItem
              href="https://github.com/wu-rymd/kaiserschmarrn"
              text="GitHub repo for server"
            />
          </li>
          <li>
            <ExternalLinkItem href="#" text="Documentation" />
          </li>
        </ul>
      </>
    }
  >
    <p>Manage virtual stock accounts</p>
  </HelpPanel>
);
