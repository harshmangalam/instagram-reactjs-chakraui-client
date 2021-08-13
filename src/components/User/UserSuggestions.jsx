import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { fetchUserSuggestions } from "../../services/userService";


import FollowUser from "./FollowUser";
import UserSkelton from "./UserSkelton";

function UserSuggestions() {
  const { isLoading, isError, data } = useQuery(
    "user_suggestions",
    fetchUserSuggestions
  );

  if (isLoading) {
    return (
      <Box position="relative" py="2" textAlign="center">
        <UserSkelton />
      </Box>
    );
  }

  if (isError) {
    return (
      <Text>Can`t load suggestions</Text>
    );
  }

  return (
    <VStack spacing="4" alignItems="stretch">
      {data.data.length ? (
        data.data.map((user) => (
          <HStack justifyContent="space-between" key={user.id}>
            <HStack>
              <Avatar src={user.profile_pic} size="sm" />
              <Box>
                <Link to={`/${user.username}`}>
                  <Text fontSize="md" fontWeight="bold">
                    {user.username}
                  </Text>
                </Link>
              </Box>
            </HStack>

            <FollowUser user={user} />
          </HStack>
        ))
      ) : (
        <Box textAlign="center" py="4">
          <Text>No Suggestions</Text>
        </Box>
      )}
    </VStack>
  );
}

export default UserSuggestions;
