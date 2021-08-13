import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { FiInstagram } from "react-icons/fi";

function Empty({ text }) {
  console.log(text);
  return (
    <Box py="4">
      <VStack textAlign="center">
        <Icon as={FiInstagram} w="16" h="16" />
        <Text fontSize="lg">{text}</Text>
      </VStack>
    </Box>
  );
}

export default Empty;
