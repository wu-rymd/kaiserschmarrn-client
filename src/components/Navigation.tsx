import { SideNavigation } from '@cloudscape-design/components';

const navHeader = { text: 'Trading Client', href: '#/' };
const navItems = [
  {
    type: 'section',
    text: 'Manage stock accounts',
    items: [
      { type: 'link', text: 'Accounts', href: '/accounts' },
      { type: 'link', text: 'Stocks', href: '/stocks' },
    ],
  },
];

/*const defaultOnFollowHandler = (ev: any) => {
  // keep the locked href for our demo pages for now
  ev.preventDefault();
};*/

export function Navigation(props: any) {
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
