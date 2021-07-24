import { Box, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

function PostSkelton() {
  return (
    <Box bg="white" border="1px" borderColor="gray.200">
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
