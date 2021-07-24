import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  Image,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgAddR } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";

import * as yup from "yup";

import { createPost } from "../../services/postService";
const schema = yup.object().shape({
  image: yup.string().required(),
});

function CreatePost() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation((data) => createPost(data), {
    onSuccess(data) {
      toast({
        title: "Post Message",
        description: data.message,
        status: data.status,
        duration: 4000,
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

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Upload"
        variant="ghost"
        rounded="full"
        icon={<CgAddR fontSize="24px" />}
        size="md"
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Provide image url from anywhere it will shown in post
            </Text>

            <Box my="4">
              <form
                onSubmit={handleSubmit((data, e) => {
                  mutation.mutate(data);
                  setImageUrl("");
                  e.target.reset();
                  onClose();
                })}
              >
                <FormControl id="image" isInvalid={errors.image}>
                  <FormLabel htmlFor="image">Image URL</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdImage color="green" size="30px" />}
                    />
                    <Input
                      id="image"
                      type="text"
                      placeholder="Image URL"
                      {...register("image")}
                      onBlur={(e) => setImageUrl(e.target.value)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.image && errors.image.message}
                  </FormErrorMessage>
                </FormControl>
                <Box my="2">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      w="full"
                      h={["60", "60", "96"]}
                      loading="lazy"
                    />
                  )}
                </Box>
                <Button
                  my="4"
                  type="submit"
                  leftIcon={<FaPlus size="20px" />}
                  variant="solid"
                  w="full"
                  colorScheme="twitter"
                  isLoading={mutation.isLoading}
                >
                  Create Post
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
