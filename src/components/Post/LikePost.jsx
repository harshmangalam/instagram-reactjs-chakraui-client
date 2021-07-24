import { HStack, IconButton, Text, useToast } from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { likePost } from "../../services/postService";
import useAuth from "../../store/authStore";

function LikePost({ post }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const currentUser = useAuth((state) => state.currentUser);

  const mutation = useMutation((postId) => likePost(postId), {
    onSuccess(data) {
      toast({
        title: "Post Message",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.refetchQueries("posts");
    },
    onError(error) {
      console.log(error);
      toast({
        title: "Post Message",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const hasHeart = post.edges.likes?.find((user) => user.id === currentUser.id);

  return (
    <HStack>
      <IconButton
        onClick={() => mutation.mutate(post.id)}
        aria-label="More"
        variant="ghost"
        rounded="full"
        icon={
          hasHeart ? (
            <AiFillHeart  color="tomato" fontSize="24px" />
          ) : (
            <AiOutlineHeart fontSize="24px" />
          )
        }
        size="md"
      />
      <Text fontWeight="bold" fontSize="sm">
        {post.edges?.likes?.length}
      </Text>
    </HStack>
  );
}

export default LikePost;
