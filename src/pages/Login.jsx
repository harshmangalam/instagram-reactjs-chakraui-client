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

import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";
import useAuth from "../store/authStore";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Login({ history }) {
  const toast = useToast();

  const dispatch = useAuth((state) => state.dispatch);

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
        `${process.env.REACT_APP_ENDPOINT}/auth/login`,
        data
      );

      toast({
        title: "Login Message",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      dispatch({ type: "AUTHENTICATED", payload: true });
      dispatch({ type: "CURRENT_USER", payload: res.data.data });

      history.push("/");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          title: "Login Error",
          description: error.response.data.message,
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

        <Box my="8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username"></FormLabel>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("username")}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password"></FormLabel>
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
                Log in
              </Button>
            </VStack>
          </form>
        </Box>

        <Box>
          <HStack>
            <Divider />
            <Text color="gray.400" fontSize="sm" fontWeight="bold">
              OR
            </Text>
            <Divider />
          </HStack>
        </Box>

        <Box display="flex" justifyContent="center" mt="4">
          <Button
            size="sm"
            leftIcon={<FaFacebookSquare size="18px" />}
            colorScheme="facebook"
            textDecoration="none"
            variant="ghost"
          >
            Log in with Facebook
          </Button>
        </Box>
      </Box>

      <Box p="4" borderWidth="1px" my="4">
        <HStack justifyContent="center">
          <Text fontSize="sm">Don`t have an Account ?</Text>
          <Link to="/auth/signup">
            <Text color="blue.500">Signup</Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default Login;
