import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchUserByUsername } from "../services/userService";
import MobileNav from "../components/Header/MobileNav";
import UserFollowers from "../components/User/UserFollowers";
import UserFollowings from "../components/User/UserFollowings";
import UserPosts from "../components/User/UserPosts";
import useAuth from "../store/authStore";
function Profile() {
  const { username } = useParams();
  const currentUser = useAuth((state) => state.currentUser);
  const {
    isLoading: userLoading,
    isError: postError,
    data: userData,
  } = useQuery(["profile", username], () => fetchUserByUsername(username));

  return (
    <Box>
      <MobileNav>
        <Text flexGrow="1" textAlign="center" fontSize="xl" fontWeight="bold">
          {userData ? userData.data.username : " Loading... "}
        </Text>
      </MobileNav>

      <Box pt={["14", "14", "0"]}>
        {userData && (
          <>
            <Box display={["none", "none", "block"]}>
              <HStack maxW="xl" m="auto" spacing={[14]}>
                <Avatar size={["2xl"]} src={userData.data.profile_pic} />

                <VStack alignItems="stretch" spacing={["4"]}>
                  <HStack justifyContent="space-between">
                    <Text>{userData.data.username}</Text>
                    {currentUser.id === userData.data.id && (
                      <Button variant="outline">Edit Profile</Button>
                    )}
                  </HStack>

                  <HStack justifyContent="space-between">
                    <HStack>
                      <Text fontWeight="bold">
                        {userData.data.edges.posts?.length || 0}
                      </Text>
                      <Text>posts</Text>
                    </HStack>

                    <UserFollowers user={userData.data} />

                    <UserFollowings user={userData.data} />
                  </HStack>

                  <Text>{userData.data.username}</Text>
                </VStack>
              </HStack>
            </Box>

            {/* display on mobile devices only  */}
            <Box display={["block", "block", "none"]}>
              <HStack px="4" py="4" spacing={6}>
                <Avatar size="xl" src={userData.data.profile_pic} />
                <VStack flexGrow="1" alignItems="stretch" spacing={["4"]}>
                  <Text fontWeight="medium" fontSize="x-large">
                    {userData.data.name}
                  </Text>
                  <Button w="full">Edit Profile</Button>
                </VStack>
              </HStack>

              <Box my="4">
                <Divider />

                <Box py="4" px="4">
                  <HStack justifyContent="space-between">
                    <Box textAlign="center">
                      <Text fontWeight="bold">
                        {userData.data.edges.posts?.length || 0}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        posts
                      </Text>
                    </Box>
                    <Box
                      as={Link}
                      to={`/${userData.data.username}/followers`}
                      textAlign="center"
                    >
                      <Text fontWeight="bold">
                        {userData.data.edges.followers?.length || 0}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Followers
                      </Text>
                    </Box>
                    <Box
                      as={Link}
                      to={`/${userData.data.username}/followings`}
                      textAlign="center"
                    >
                      <Text fontWeight="bold">
                        {userData.data.edges.followings?.length || 0}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Followings
                      </Text>
                    </Box>
                  </HStack>
                </Box>

                <Divider />
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Divider
        mt="10"
        borderColor="gray.400"
        display={["none", "none", "block"]}
      />

      <Box py="4" px={["2", "2", "0"]}>
        {userData && <UserPosts user={userData.data} />}
      </Box>
    </Box>
  );
}

export default Profile;
