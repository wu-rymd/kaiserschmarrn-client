import { Cards, Header, Modal, Box } from "@cloudscape-design/components";

export function NftViewModal(props: any) {
  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel={props.closeAriaLabel}
    >
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.nftId}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          sections: [
            {
              id: "nftId",
              header: "Nft ID",
              content: (item) => item.nftId,
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
            nftId: `${props.selectedItem.nftId}`,
            price: `${props.selectedItem.price}`,
          },
        ]}
        loadingText={props.loadingText}
        empty={props.empty}
        header={<Header>{props.selectedItem.nftId}</Header>}
      />
    </Modal>
  );
}
