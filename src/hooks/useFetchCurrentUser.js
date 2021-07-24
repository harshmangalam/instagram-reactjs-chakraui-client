import axios from "axios";
import { useState } from "react";

function useFetchCurrentUser() {
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
 

  async function fetchCurrentUser() {
    try {
      const res = await axios.get("/auth/me");
      return res.data;
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }
  return {
    isFetching,
    isError,
    fetchCurrentUser,
  };
}

export default useFetchCurrentUser;
