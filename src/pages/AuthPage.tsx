import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
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
import { AuthModel } from "../models";
import { AuthProvider } from "../providers";
import { useNavigate } from "react-router-dom";
import { ClientModel } from "../models";

export function AuthPage(props: any) {
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  if (props.accessToken.length > 0) {
    AuthProvider.getClient(props.accessToken).then((res) => {
      if (res.status === 200) {
        res.text().then((clientId) => {
          props.setClient(new ClientModel({ clientId }));
        });
        setUserLoggedIn(true);
      }
    });
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const a = new AuthModel({ clientId, password });
      let res = await AuthProvider.login(a);

      if (res.status === 200) {
        setSuccessMessage(`Login successful. Redirecting...`);
        setShowSuccess(true);
        setShowError(false);
        const jsonRes = await res.json();
        props.setAccessToken(jsonRes.accessToken);
        props.setClient(new ClientModel({ clientId: jsonRes.clientId }));
        setUserLoggedIn(true);
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
    setClientId("");
    setPassword("");
  };

  return (
    <Modal
      onDismiss={reset}
      visible={true}
      header={"Login"}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={reset}>
              Clear
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Login
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Box margin={{ vertical: "xs", horizontal: "l" }} textAlign="center">
        <Box>
          <Alert
            onDismiss={() => setShowSuccess(false)}
            visible={showSuccess}
            dismissAriaLabel="Close alert"
            dismissible
            type="success"
          >
            {successMessage}
          </Alert>
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
                <FormField label="Client ID">
                  <Input
                    value={clientId}
                    onChange={(event) => setClientId(event.detail.value)}
                  />
                </FormField>
                <FormField label="Password">
                  <Input
                    value={password}
                    onChange={(event) => setPassword(event.detail.value)}
                  />
                </FormField>
              </SpaceBetween>
            </Form>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
