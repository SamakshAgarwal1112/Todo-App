import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../utils/apis";
import useTaskStore from "../taskStore";
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

export default function Register() {
  const { setUser } = useTaskStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const toast = useToast();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(name && email && password && password2)) {
      toast({
        title: "Data Error",
        description: "Please enter data in all the fields!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password !== password2) {
      toast({
        title: "Password Error",
        description:
          'Password entered in "Confirm Password" field doesn\'t match the "Password" field',
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const userData = { name, email, password };
      const response = await register(userData);
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast({
          title: "Success",
          description: "User registered successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      setUser(null);
      toast({
        title: "Error",
        description:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
        status: "error",
        duration: 2000,
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
          <Stack textAlign="center" color="#646681" fontWeight="500" mb="2rem">
            <Text fontSize={["1.7rem", "2.2rem"]} fontWeight="600">
              Register with us
            </Text>
            <Text fontSize={["1rem", "1.2rem"]}>
              Please create user account
            </Text>
          </Stack>

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
                  Username:{" "}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <Input
                    type="text"
                    focusBorderColor="#4250f5"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name..."
                    onChange={onChange}
                  />
                </Box>
              </Box>
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
              <Box mb={["1rem", "1.5rem"]}>
                <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                  Confirm Password:{" "}
                </Text>
                <Box bg="#ffffff" borderRadius="0.4rem">
                  <Input
                    type="password"
                    focusBorderColor="#4250f5"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm Password..."
                    onChange={onChange}
                  />
                </Box>
              </Box>
              <Center>
                {loading ? (
                  <Button isLoading loadingText="Signing Up...">
                    Register
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
                    Register
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
              Already registered with us?{" "}
              <Text as="span" color="#4250f5" fontWeight="600">
                <Link to="/login">Login</Link>
              </Text>
            </Text>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
