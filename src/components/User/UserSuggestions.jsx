import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { fetchUserSuggestions } from "../../services/userService";
import FollowUser from "./FollowUser";
import UserSkelton from "./UserSkelton";



function UserSuggestions() {
  const { isLoading, isError, data } = useQuery("user_suggestions", fetchUserSuggestions);


  return (
    <Box mt="6">
      <HStack justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold" color="gray.500">
          Suggestions for you
        </Text>
        <Text fontWeight="bold" fontSize="sm">
          <Link to="/explore/users">See All</Link>
        </Text>
      </HStack>

      <Box my="4">
        <VStack spacing="4" alignItems="stretch">
          {isLoading && <UserSkelton />}
          {isError && <p>Error</p>}
          {data &&
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
            ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default UserSuggestions;
