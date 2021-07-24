import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { followUnfollowUser } from "../../services/userService";
import useAuth from "../../store/authStore";

function FollowUser({ user }) {
  const currentUser = useAuth((state) => state.currentUser);
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation((userId) => followUnfollowUser(userId), {
    onSuccess(data) {
      toast({
        title: "User Message",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.refetchQueries("user_suggestions");
      queryClient.refetchQueries("users");
    },
    onError(error) {
      console.log(error);
      toast({
        title: "User Error",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const hasFollowing = user.edges.followers?.find(
    (u) => u.id === currentUser.id
  );

  return (
    <Button
      onClick={() => mutation.mutate(user.id)}
      variant="ghost"
      size="sm"
      colorScheme="twitter"
      isLoading={mutation.isLoading}
    >
      {hasFollowing ? "Follow" : "Unfollow"}
    </Button>
  );
}

export default FollowUser;
