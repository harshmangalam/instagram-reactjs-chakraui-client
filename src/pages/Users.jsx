import { Avatar, Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import MobileNav from "../components/Header/MobileNav";
import { useQuery } from "react-query";
import { fetchUserSuggestions } from "../services/userService";
import FollowUser from "../components/User/FollowUser";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Users() {
  const { isLoading, isError, data } = useQuery("users", fetchUserSuggestions);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text textAlign="center">Can`t load users</Text>;
  }

  return (
    <Box>
      <MobileNav>
        <Text flexGrow="1" textAlign="center" fontSize="xl" fontWeight="bold">
          Explore Users
        </Text>
      </MobileNav>

      <Box pt={["14", "14", "0"]} maxW="md" m="auto">
        <Box py="4" px={["2", "2", "0"]}>
          <Text fontSize="lg">Suggestions</Text>
        </Box>

        <VStack spacing="6" alignItems="stretch" px={["2", "2", "0"]}>
          {data.data.length ? (
            data.data.map((user) => (
              <HStack key={user.id} justify="space-between">
                <HStack spacing="4">
                  <Avatar />
                  <Link to={`/${user.username}`}>
                    <Text fontWeight="bold">{user.name}</Text>
                  </Link>
                </HStack>
                <FollowUser user={user} />
              </HStack>
            ))
          ) : (
            <Text textAlign="center">No Users</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default Users;
