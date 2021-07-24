import { Box, Button } from "@chakra-ui/react";

function UserFollowings({ user }) {
  return (
    <Box>
      <Button variant="ghost" size="sm">
        {user.edges.followings?.length || 0} Followings
      </Button>
    </Box>
  );
}

export default UserFollowings;
