// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from "react";
import {
  Box,
  Button,
  StatusIndicator,
  Popover,
  StatusIndicatorProps,
} from "@cloudscape-design/components";

const SUCCESS_STATUS = "success";
const ERROR_STATUS = "error";

async function copyToClipboard(text: any) {
  return navigator.clipboard.writeText(text);
}

export function CopyText(props: {
  copyText: any;
  copyButtonLabel: any;
  successText: any;
  errorText: any;
}) {
  const [status, setStatus] = useState(SUCCESS_STATUS);
  const [message, setMessage] = useState(props.successText);

  return (
    <div style={{ display: "flex" }}>
      <Box margin={{ right: "xxs" }} display="inline-block">
        <Popover
          size="small"
          position="top"
          dismissButton={false}
          triggerType="custom"
          content={
            <StatusIndicator type={status as StatusIndicatorProps.Type}>
              {message}
            </StatusIndicator>
          }
        >
          <Button
            variant="inline-icon"
            iconName="copy"
            ariaLabel={props.copyButtonLabel}
            onClick={() => {
              copyToClipboard(props.copyText.props.value).then(
                () => {
                  setStatus(SUCCESS_STATUS);
                  setMessage(props.successText);
                },
                () => {
                  setStatus(ERROR_STATUS);
                  setMessage(props.errorText);
                }
              );
            }}
          />
        </Popover>
      </Box>
      {props.copyText}
    </div>
  );
}
