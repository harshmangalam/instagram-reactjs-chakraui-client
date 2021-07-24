import axios from "axios";

export const fetchPosts = async () => {
  try {
    const res = await axios.get("/post");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (data) => {
  try {
    const res = await axios.post("/post", data);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletPost = async (postId) => {
  try {
    const res = await axios.delete(`/post/${postId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};



export const likePost = async (postId) => {
  try {
    const res = await axios.patch(`/post/${postId}/heart`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
