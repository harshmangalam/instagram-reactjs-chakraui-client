import {  Box, Grid, Text, Image, VStack, Icon } from "@chakra-ui/react";
import { IoMdImages } from "react-icons/io";
function UserPosts({ user }) {
  if (!user.edges.posts?.length) {
    return (
      <VStack>
        <Icon as={IoMdImages} w="100px" h="100px" color="blue.500" />
        <Text textColor="gray" fontSize="x-large">No Posts</Text>
      </VStack>
    );
  }
  return (
    <Grid
      templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={6}
    >
      {user.edges.posts.map((post) => (
        <Box key={post.id}>
          <Image
            width="full"
            height={["200px", "300px", "400px"]}
            objectFit="cover"
            src={post.image}
            alt="post"
            loading="lazy"
          />
        </Box>
      ))}
    </Grid>
  );
}

export default UserPosts;
