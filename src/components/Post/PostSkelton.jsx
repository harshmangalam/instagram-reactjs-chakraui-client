import { Box, HStack, Skeleton, SkeletonCircle, useColorMode } from "@chakra-ui/react";

function PostSkelton() {
  const {colorMode} = useColorMode()
  return (
    <Box bg={colorMode==="light" ? "white" : "gray.700"}>
      <HStack spacing="4" p="4">
        <SkeletonCircle size="10" />

        <Skeleton w="32" h="4" />
      </HStack>

      <Box>
        <Skeleton width="full" height="700px" />
      </Box>
    </Box>
  );
}

export default PostSkelton;
