import {
  Avatar,
  Box,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../../store/authStore";
import { BsPeople } from "react-icons/bs";

function FooterNav() {
  const currentUser = useAuth((state) => state.currentUser);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.700"}
      position="fixed"
      bottom="0"
      right="0"
      left="0"
      display={["block", "block", "none"]}
    >
      <HStack justifyContent="space-between" py="1" px="1">
        <IconButton
          as={Link}
          to="/"
          aria-label="Home"
          variant="ghost"
          rounded="full"
          icon={<AiOutlineHome fontSize="28px" />}
          size="md"
        />

        <IconButton
          aria-label="Search"
          variant="ghost"
          rounded="full"
          icon={<RiSearch2Line fontSize="28px" />}
          size="md"
        />

        <IconButton
          aria-label="Users"
          as={Link}
          to="/explore/users"
          variant="ghost"
          rounded="full"
          icon={<BsPeople fontSize="28px" />}
          size="md"
        />

        <IconButton
          variant="ghost"
          rounded="full"
          onClick={toggleColorMode}
          icon={
            colorMode === "light" ? (
              <BiMoon fontSize="28px" />
            ) : (
              <BiSun size="28px" />
            )
          }
        ></IconButton>

        <Avatar
          as={Link}
          to={`/${currentUser?.username}`}
          size="sm"
          name="Harsh Mangalam"
        />
      </HStack>
    </Box>
  );
}

export default FooterNav;
