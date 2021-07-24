import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorMode,
} from "@chakra-ui/react";


import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";
import CreatePost from "../Post/CreatePost";
function Navbar() {
  const { colorMode } = useColorMode();
  return (
    <Box
      py="1"
      px={["0", "0", "4"]}
      display={["none", "none", "block"]}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="overlay"
      bg={colorMode === "light" ? "white" : "gray.700"}
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
    >
      <Box maxW="container.lg" mx="auto">
        <HStack justifyContent="space-between">
          <Link to="/">
            <Text fontSize="x-large" fontWeight="semibold">
              Instagram
            </Text>
          </Link>
          <Box>
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<RiSearch2Line color="gray" />}
              />
              <Input type="search" placeholder="Search" />
            </InputGroup>
          </Box>

          <HStack>
            <IconButton
              aria-label="Home"
              variant="ghost"
              rounded="full"
              as={Link}
              to="/"
              icon={<AiOutlineHome fontSize="24px" />}
              size="md"
            />

            <CreatePost />

            <IconButton
              aria-label="Activity"
              variant="ghost"
              rounded="full"
              icon={<AiOutlineHeart fontSize="24px" />}
              size="md"
            />

            <IconButton
              aria-label="Users"
              as={Link}
              to="/explore/users"
              variant="ghost"
              rounded="full"
              icon={<BsPeople fontSize="24px" />}
              size="md"
            />

            <ProfileDropdown />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default Navbar;
