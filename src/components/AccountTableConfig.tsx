import { Link } from '@cloudscape-design/components';
import { addColumnSortLabels } from './TableConfigUtils';

export const ACCOUNT_PREFERENCES = {
  pageSize: 10,
  visibleContent: ['accountId', 'balance', 'startingBalance'],
  wrapLines: false,
};

export const ACCOUNT_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: 'accountId',
    header: 'Account ID',
    cell: (item: any) => (
      <div>
        <Link href="#">{item.accountId}</Link>
      </div>
    ),
    minWidth: 180,
    sortingField: 'accountId',
  },
  {
    id: 'balance',
    header: 'Balance',
    cell: (item: any) => item.balance,
    minWidth: 180,
    sortingField: 'balance',
  },
  {
    id: 'startingBalance',
    header: 'Starting Balance',
    cell: (item: any) => item.startingBalance,
    minWidth: 180,
    sortingField: 'startingBalance',
  },
]);

export const ACCOUNT_PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Accounts' },
  { value: 25, label: '25 Accounts' },
  { value: 50, label: '50 Accounts' },
];

export const ACCOUNT_FILTERING_PROPERTIES = []; // empty for now

export const ACCOUNT_VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main account properties',
    options: [
      { id: 'accountId', label: 'Account ID', editable: false },
      { id: 'balance', label: 'Balance' },
      { id: 'startingBalance', label: 'Starting Balance' },
    ],
  },
];
