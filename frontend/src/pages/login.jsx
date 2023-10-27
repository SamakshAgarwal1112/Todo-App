import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useTaskStore from "../taskStore";
import { login } from "../utils/apis";
import {
  useToast,
  Button,
  Text,
  Stack,
  Flex,
  Box,
  Center,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import Navbar from "../components/navbar";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const { loggedInUser, setLoggedInUser } = useTaskStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      toast({
        title: "Data Error",
        description: "Please enter both email and password",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (loggedInUser !== null) {
      toast({
        title: "App in use",
        description: "Kindly logout the current user first!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const loginCred = { email, password };
      const response = await login(loginCred);
      if (response.status === 201) {
        setLoggedInUser(response.data);
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
        toast({
          title: "Success",
          description: "Logged in successfully!",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => {
            navigate("/");
          },
        });
      }
    } catch (error) {
      setLoggedInUser(null);
      toast({
        title: "Error",
        description:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Center m={0} p={0}>
        <Stack>
          <Text
            textAlign="center"
            color="#646681"
            fontSize={["1.7rem", "2.2rem"]}
            fontWeight="600"
            mb={["1.5rem", "2rem"]}
          >
            Login
          </Text>
          <Flex
            direction="column"
            bg="#ecedf6"
            w={["20rem", "27rem"]}
            px={["1rem", "2rem"]}
            py={["1rem", "2rem"]}
            borderRadius="0.4rem"
            mb="1rem"
          >
            <form onSubmit={onSubmit}>
              <Box mb={["1rem", "1.5rem"]}>
                <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                  Email:{" "}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <Input
                    type="email"
                    focusBorderColor="#4250f5"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email..."
                    onChange={onChange}
                  />
                </Box>
              </Box>
              <Box mb={["1rem", "1.5rem"]}>
                <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                  Password:{" "}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      focusBorderColor="#4250f5"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter your password..."
                      onChange={onChange}
                    />
                    <InputRightElement onClick={handleShowPassword}>
                      {showPassword ? (
                        <BiHide
                          style={{ width: "20px", height: "20px" }}
                          color="#3d3d3d"
                        />
                      ) : (
                        <BiShow
                          style={{ width: "20px", height: "20px" }}
                          color="#3d3d3d"
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Box>
              <Center>
                {loading ? (
                  <Button isLoading loadingText="Logging In...">
                    Login
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    letterSpacing={1}
                    mt={["1rem", ""]}
                    fontSize={["1rem", "1.2rem"]}
                    bg="#4250f5"
                    color="white"
                    _hover={{
                      bg: "#2732b8",
                    }}
                  >
                    Login
                  </Button>
                )}
              </Center>
            </form>
          </Flex>
          <Center>
            <Text
              color="#646681"
              fontSize={["1.1rem", "1.2rem"]}
              fontWeight="500"
            >
              Don't have an account?{" "}
              <Text as="span" color="#4250f5" fontWeight="600">
                <Link to="/register">Register</Link>
              </Text>
            </Text>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
