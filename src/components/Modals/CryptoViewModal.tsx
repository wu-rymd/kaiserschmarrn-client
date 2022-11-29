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
          itemSelectionLabel: (e, t) => `select ${t.cryptoId}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          sections: [
            {
              id: "cryptoId",
              header: "Crypto ID",
              content: (item) => item.cryptoId,
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
            cryptoId: `${props.selectedItem.cryptoId}`,
            price: `${props.selectedItem.price}`,
          },
        ]}
        loadingText={props.loadingText}
        empty={props.empty}
        header={<Header>{props.selectedItem.cryptoId}</Header>}
      />
    </Modal>
  );
}
