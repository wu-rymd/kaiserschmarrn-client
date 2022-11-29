import { Cards, Header, Modal, Box } from "@cloudscape-design/components";

export function StockViewModal(props: any) {
  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel={props.closeAriaLabel}
    >
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.stockId}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          sections: [
            {
              id: "stockId",
              header: "Stock ID",
              content: (item) => item.stockId,
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
            stockId: `${props.selectedItem.stockId}`,
            price: `${props.selectedItem.price}`,
          },
        ]}
        loadingText={props.loadingText}
        empty={props.empty}
        header={<Header>{props.selectedItem.stockId}</Header>}
      />
    </Modal>
  );
}
