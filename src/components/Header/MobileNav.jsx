import { Box, HStack, useColorMode } from "@chakra-ui/react";

function MobileNav({ children }) {
  const {colorMode}  = useColorMode()
  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.700"}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="overlay"
      display={["block", "block", "none"]}
    >
      <HStack py="2" px="1" justifyContent="space-between">
        {children}
      </HStack>
    </Box>
  );
}

export default MobileNav;
