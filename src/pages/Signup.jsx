import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";

const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

function Signup({ history }) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/auth/signup`,
        data
      );

      toast({
        title: "Signup Message",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      history.push("/auth/login");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          title: "Signup Error",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const handleCheckUsername = async (e) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/auth/check_username/${e.target.value}`
      );
      console.log(res);
    } catch (error) {
      if (error?.response?.status === 406) {
        toast({
          title: "Signup Error",
          description: "Username already exists",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }

      if (error?.response?.status === 500) {
        toast({
          title: "Server Error",
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box maxW="md" mx="auto">
      <Box px="10" py="4" borderWidth="1px">
        <Heading textAlign="center">Instagram</Heading>
        <Text
          textAlign="center"
          fontWeight="bold"
          color="gray.500"
          fontSize="lg"
          my="4"
        >
          Sign up to see photos from your friends.
        </Text>

        <Box my="4">
          <Button
            size="sm"
            colorScheme="twitter"
            w="full"
            leftIcon={<FaFacebookSquare fontSize="18px" />}
          >
            Log in with Facebook
          </Button>
        </Box>

        <HStack>
          <Divider />
          <Text color="gray.400" fontSize="sm">
            OR
          </Text>
          <Divider />
        </HStack>

        <Box my="4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Full Name"
                  {...register("name")}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("username")}
                  onBlur={handleCheckUsername}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                isLoading={isSubmitting}
                w="full"
                type="submit"
                colorScheme="twitter"
              >
                Sign up
              </Button>
            </VStack>

            <Box my="4">
              <Text fontSize="xs" color="gray.500">
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </Text>
            </Box>
          </form>
        </Box>
      </Box>

      <Box p="4" borderWidth="1px" my="4">
        <HStack justifyContent="center">
          <Text fontSize="sm">Have an Account ?</Text>
          <Link to="/auth/login">
            <Text color="blue.500">Login</Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default Signup;
