import { BreadcrumbGroup } from '@cloudscape-design/components';

export function AccountsBreadcrumbs() {
  const resourcesBreadcrumbs = [
    {
      text: 'Trading Client',
      href: '/',
    },
    {
      text: 'Accounts',
      href: '/accounts',
    },
  ];

  return (
    <BreadcrumbGroup
      items={resourcesBreadcrumbs}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}
