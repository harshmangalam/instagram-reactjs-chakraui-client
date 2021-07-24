import { Box, ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Loading from "./components/Loading";
import FooterNav from "./components/Footer/FooterNav";
import Navbar from "./components/Header/Navbar";
import useAuth from "./store/authStore";
import axios from "axios";

import { QueryClientProvider, QueryClient } from "react-query";

const Home = lazy(() => import("./pages/Home"));
const Users = lazy(() => import("./pages/Users"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;
axios.defaults.withCredentials = true;

function App() {
  const [fetching, setFetching] = useState(true);

  const client = new QueryClient();

  const dispatch = useAuth((state) => state.dispatch);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  async function fetchCurrentUser() {
    try {
      const res = await axios.get("/auth/me");
      dispatch({ type: "AUTHENTICATED", payload: true });
      dispatch({ type: "CURRENT_USER", payload: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (fetching) {
    return <Loading />;
  }
  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Router>
          <Box position="relative" maxW="100vw" minH="100vh">
            {isAuthenticated && <Navbar />}

            <Suspense fallback={<Loading />}>
              <Box
                py={["0", "0", "16"]}
                maxW="container.lg"
                mx="auto"
                px={["0", "0", "4", "0"]}
              >
                <Switch>
                  <ProtectedRoute path="/" exact component={Home} />
                  <ProtectedRoute path="/:username" exact component={Profile} />
                  <ProtectedRoute path="/explore/users" exact component={Users} />

                  <Route
                    path="/auth/login"
                    exact
                    render={(props) =>
                      isAuthenticated ? (
                        <Redirect to="/" />
                      ) : (
                        <Login {...props} />
                      )
                    }
                  />
                  <Route
                    path="/auth/signup"
                    exact
                    render={(props) =>
                      isAuthenticated ? (
                        <Redirect to="/" />
                      ) : (
                        <Signup {...props} />
                      )
                    }
                  />
                </Switch>
              </Box>
            </Suspense>

            {isAuthenticated && <FooterNav />}
          </Box>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
