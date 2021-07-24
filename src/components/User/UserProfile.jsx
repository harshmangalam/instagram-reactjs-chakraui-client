import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import useAuth from "../../store/authStore";

function UserProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  return (
    <Box>
      <HStack>
        <Avatar  src={currentUser.profile_pic} />
        <Box>
          <Text fontSize="md" fontWeight="bold">
            {currentUser.username}
          </Text>
          <Text fontSize="md" color="gray.500">
            {currentUser.name}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default UserProfile;
