import { Cards, Header, Modal, Box } from "@cloudscape-design/components";

export function CryptoViewModal(props: any) {
  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel={props.closeAriaLabel}
    >
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.cryptocurrencyId}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          sections: [
            {
              id: "cryptocurrencyId",
              header: "Crypto ID",
              content: (item) => item.cryptocurrencyId,
            },
            {
              id: "price",
              header: "Price",
              content: (item) => item.price,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }]}
        items={[
          {
            cryptocurrencyId: `${props.selectedItem.cryptocurrencyId}`,
            price: `${props.selectedItem.price}`,
          },
        ]}
        loadingText={props.loadingText}
        empty={props.empty}
        header={<Header>{props.selectedItem.cryptocurrencyId}</Header>}
      />
    </Modal>
  );
}
