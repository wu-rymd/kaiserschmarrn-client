import { Cards, Header, Modal } from "@cloudscape-design/components";

export function AccountViewModal(props: any) {
  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel={props.closeAriaLabel}
    >
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.accountId}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          sections: [
            {
              id: "accountId",
              header: "Account ID",
              content: (item) => item.accountId,
            },
            {
              id: "balance",
              header: "Balance",
              content: (item) => item.balance,
            },
            {
              id: "startingBalance",
              header: "Starting Balance",
              content: (item) => item.startingBalance,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }]}
        items={[
          {
            accountId: `${props.selectedItem.accountId}`,
            balance: `${props.selectedItem.balance}`,
            startingBalance: `${props.selectedItem.startingBalance}`,
          },
        ]}
        loadingText={props.loadingText}
        empty={props.empty}
        header={<Header>{props.selectedItem.accountId}</Header>}
      />
    </Modal>
  );
}
