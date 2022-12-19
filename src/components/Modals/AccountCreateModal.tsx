import "@cloudscape-design/global-styles/index.css";
import { useState } from "react";
import {
  Form,
  Button,
  SpaceBetween,
  FormField,
  Input,
  Box,
  Alert,
  Modal,
} from "@cloudscape-design/components";
import { AccountModel } from "../../models";

export function AccountCreateModal(props: any) {
  const [accountId, setAccountId] = useState("");
  const [balance, setBalance] = useState("");
  const [startingBalance, setStartingBalance] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const a = new AccountModel({
        accountId,
        balance,
        startingBalance,
        clientId: props.client.clientId,
      });
      const res = await props.createResource(a);
      if (res.status === 200) {
        props.setSuccessMessage(`Account created successfully`);
        props.setShowSuccess(true);
        props.setRefresh(props.refresh + 1);
        reset();
      } else {
        setErrorMessage("Some error occured");
        setShowError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setShowError(false);
    setErrorMessage("");
    props.setVisible(false);
    setAccountId("");
    setBalance("");
    setStartingBalance("");
  };

  return (
    <Modal
      onDismiss={reset}
      visible={props.visible}
      closeAriaLabel={props.closeAriaLabel}
      header={props.header}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={reset}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Box margin={{ vertical: "xs", horizontal: "l" }} textAlign="center">
        <Box>
          <Alert
            onDismiss={reset}
            visible={showError}
            dismissAriaLabel="Close alert"
            dismissible
            type="error"
          >
            {errorMessage}
          </Alert>
        </Box>
        <Box>
          <form onSubmit={handleSubmit}>
            <Form>
              <SpaceBetween direction="vertical" size="s">
                <FormField label="Account ID">
                  <Input
                    value={accountId}
                    onChange={(event) => setAccountId(event.detail.value)}
                  />
                </FormField>
                <FormField label="Balance">
                  <Input
                    value={balance}
                    onChange={(event) => {
                      setBalance(event.detail.value);
                      setStartingBalance(event.detail.value);
                    }}
                  />
                </FormField>
                <FormField label="Starting Balance">
                  <Input
                    value={startingBalance}
                    // onChange={(event) => setStartingBalance(event.detail.value)}
                    disabled
                  />
                </FormField>
                <FormField label="Client ID">
                  <Input value={props.client.clientId} disabled />
                </FormField>
              </SpaceBetween>
            </Form>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
