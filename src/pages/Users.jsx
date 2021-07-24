import { Avatar, Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import MobileNav from "../components/Header/MobileNav";
import { useQuery } from "react-query";
import { fetchUsers } from "../services/userService";
import FollowUser from "../components/User/FollowUser";
import { Link } from "react-router-dom";

function Users() {
  const { isLoading, isError, data } = useQuery("users", fetchUsers);
  return (
    <Box>
      <MobileNav>
        <Text flexGrow="1" textAlign="center" fontSize="xl" fontWeight="bold">
          Explore Users
        </Text>
      </MobileNav>

      <Box pt={["14", "14", "0"]} maxW="md" m="auto">
        {isLoading && <Spinner size="lg" colorScheme="twitter" />}
        {isError && <Text>Error</Text>}
        {data && (
          <VStack spacing="6" alignItems="stretch" px={["2", "2", "0"]}>
            {data.data.map((user) => (
              <HStack key={user.id} justify="space-between">
                <HStack spacing="4">
                  <Avatar />
                  <Link to={`/${user.username}`}>
                    <Text fontWeight="bold">{user.name}</Text>
                  </Link>
                </HStack>
                <FollowUser user={user} />
              </HStack>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default Users;
