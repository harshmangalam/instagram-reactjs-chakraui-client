import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

import { RiLogoutBoxLine } from "react-icons/ri";
import { BiSun, BiMoon } from "react-icons/bi";
import { Link } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import useAuth from "../../store/authStore";
function ProfileDropdown() {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const currentUser = useAuth((state) => state.currentUser);
  const handleLogout = async () => {
    const data = await logoutUser();

    if (data) {
      toast({
        title: "Logout Message",
        description: data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      window.location.reload();
    }
  };
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        _hover={{ cursor: "pointer" }}
        size="xs"
        aria-label="Profile"
      />
      <MenuList>
        <MenuItem
          as={Link}
          to={`/${currentUser?.username}`}
          icon={<AiOutlineUser fontSize="20px" />}
        >
          Profile
        </MenuItem>

        <MenuDivider />
        <MenuItem
          onClick={toggleColorMode}
          icon={
            colorMode === "light" ? (
              <BiMoon fontSize="20px" />
            ) : (
              <BiSun size="20px" />
            )
          }
        >
          {colorMode === "light" ? "Dark" : "Light"}
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          icon={<RiLogoutBoxLine fontSize="20px" />}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileDropdown;
