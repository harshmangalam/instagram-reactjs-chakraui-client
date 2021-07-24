import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Box pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
      <Spinner size="xl" color="blue.500" emptyColor="blue.100" />
    </Box>
  );
}

export default Loading;
