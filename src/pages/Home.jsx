import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import UserProfile from "../components/User/UserProfile";
import UserSuggestions from "../components/User/UserSuggestions";
import PostCard from "../components/Post/PostCard";
import MobileNav from "../components/Header/MobileNav";
import { useQuery } from "react-query";
import { fetchPosts } from "../services/postService";
import PostSkelton from "../components/Post/PostSkelton";
import { AiOutlineHeart } from "react-icons/ai";
import CreatePost from "../components/Post/CreatePost";

function Home() {
  const { isLoading, isError, data } = useQuery("posts", fetchPosts);

  return (
    <Box>
      <MobileNav>
        <CreatePost />

        <Text fontSize="xl" fontWeight="bold">
          Instagram
        </Text>

        <IconButton
          aria-label="Activity"
          variant="ghost"
          rounded="full"
          icon={<AiOutlineHeart fontSize="24px" />}
          size="md"
        />
      </MobileNav>
      <Grid
        py={["14", "14", "0"]}
        templateColumns="repeat(5, 1fr)"
        columnGap="6"
      >
        <GridItem colSpan={[5, 5, 3]}>
          <VStack spacing={4} alignItems="stretch">
            {isLoading && <PostSkelton />}
            {isError && <p>Error</p>}
            {data?.data?.length ? (
              data.data.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <Box p="2">
                <Text fontWeight="bold" color="gray.400" textAlign="center">
                No Posts
                </Text>
              </Box>
            )}
          </VStack>
        </GridItem>
        <GridItem
          colSpan={2}
          display={["none", "none", "block"]}
          maxH="500px"
          position="sticky"
          top="16"
        >
          <UserProfile />
          <UserSuggestions />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
