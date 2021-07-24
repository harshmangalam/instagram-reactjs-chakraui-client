import axios from "axios";

export const fetchUsers = async () => {
  try {
    const res = await axios.get("/user");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserSuggestions = async () => {
  try {
    const res = await axios.get("/user/suggestions");
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/user/username/${username}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/auth/logout");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const followUnfollowUser = async (userId) => {
  try {
    const res = await axios.patch(`/user/${userId}/followUnfollow`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
