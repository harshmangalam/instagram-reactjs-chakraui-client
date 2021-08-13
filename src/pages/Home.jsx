import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import UserProfile from "../components/User/UserProfile";
import UserSuggestions from "../components/User/UserSuggestions";
import PostCard from "../components/Post/PostCard";
import MobileNav from "../components/Header/MobileNav";
import { useQuery } from "react-query";
import { fetchPosts } from "../services/postService";
import { AiOutlineHeart } from "react-icons/ai";
import CreatePost from "../components/Post/CreatePost";
import { Link } from "react-router-dom";


import PostSkelton from "../components/Post/PostSkelton";

function Home() {
  const {
    isLoading: isPostLoading,
    isError: isPostError,
    data: postData,
  } = useQuery("posts", fetchPosts);

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
            {isPostLoading ? (
              <PostSkelton />
            ) : isPostError ? (
              <Text textAlign="center">Can`t load posts</Text>
            ) : postData.data.length ? (
              postData.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Text textAlign="center">No Posts</Text>
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
          <Box mt="6">
            <HStack justifyContent="space-between">
              <Text fontSize="md" fontWeight="bold" color="gray.500">
                Suggestions for you
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                <Link to="/explore/users">See All</Link>
              </Text>
            </HStack>
            <Box py="4">
              <UserSuggestions />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
