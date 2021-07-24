import {
  Avatar,
  Box,
  HStack,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import PostAction from "./PostAction";
import LikePost from "./LikePost";

function PostCard({ post }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      border="1px"
      borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      bg={colorMode === "light" ? "white" : "gray.700"}
    >
      <HStack justifyContent="space-between" py="1" px="4">
        <HStack spacing="4">
          <Avatar size="sm" src={post.edges.creator.profile_pic} />
          <Box>
            <Text fontSize="md" fontWeight="bold">
              {post.edges.creator.username}
            </Text>
          </Box>
        </HStack>

        <PostAction post={post} />
      </HStack>

      <Box>
        <Image
          width="full"
          height={["430px", "600px", "700px"]}
          objectFit="cover"
          src={post.image}
          alt={post.edges.creator.name}
          loading="lazy"
        />
      </Box>

      <HStack px="4" py="2" justifyContent="space-between">
        <LikePost post={post} />

       
      </HStack>
    </Box>
  );
}

export default PostCard;
