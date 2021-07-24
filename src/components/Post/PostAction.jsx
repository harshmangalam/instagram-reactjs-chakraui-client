import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

import { RiDeleteBin2Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "../../store/authStore";
import { deletPost } from "../../services/postService";
function PostAction({ post }) {
  const queryClient = useQueryClient();
  const currentUser = useAuth((state) => state.currentUser);
  const mutation = useMutation(() => deletPost(post.id), {
    onSuccess() {
      queryClient.invalidateQueries("posts");
    },
  });

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        _hover={{ cursor: "pointer" }}
        aria-label="More"
        variant="ghost"
        rounded="full"
        icon={<BsThreeDots fontSize="18px" />}
        size="md"
        aria-label="Post Action"
      />
      <MenuList>
        <MenuDivider />
        {currentUser.id === post.edges.creator.id && (
          <>
            <MenuItem
              onClick={() => mutation.mutate()}
              icon={<RiDeleteBin2Line fontSize="20px" />}
            >
              Delete Post
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default PostAction;
