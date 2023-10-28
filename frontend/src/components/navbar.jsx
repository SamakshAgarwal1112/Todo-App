import {
  Button,
  Flex,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useTaskStore from "../taskStore";

function Navbar() {
  const { loggedInUser, setLoggedInUser } = useTaskStore();
  const toast = useToast();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    setLoggedInUser(null);
    localStorage.setItem("loggedInUser", null);
    toast({
      title: "",
      description: "User successfully logged out!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      h="5rem"
      w="100%"
      px={["1rem", "1.6rem"]}
      mb={["2rem", "3rem"]}
      boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)"
    >
      <Text
        color="#646681"
        fontWeight="extrabold"
        fontSize={["1.5rem", "2.2rem"]}
      >
        <Link to="/">Todos-App</Link>
      </Text>
      <Flex display={["block", "none"]}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <GiHamburgerMenu
                color="#4250f5"
                style={{ width: "1.1rem", height: "1.1rem" }}
              />
            }
            variant="outline"
            borderWidth="0.15rem"
            borderColor="#4250f5"
          />
          <MenuList>
            <MenuItem
              onClick={() => navigate("/register")}
              fontSize="1.2rem"
              icon={
                <AiOutlineUserAdd style={{ width: "20px", height: "20px" }} />
              }
            >
              Register
            </MenuItem>
            <MenuItem
              isDisabled={loggedInUser === null}
              onClick={logout}
              fontSize="1.2rem"
              icon={<BiLogOut style={{ width: "20px", height: "20px" }} />}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex display={["none", "block"]}>
        <Button
          onClick={() => navigate("/register")}
          letterSpacing={1}
          fontSize="1.2rem"
          bg="#4250f5"
          color="white"
          mr="20px"
          _hover={{
            bg: "#2732b8",
          }}
        >
          Register
        </Button>

        <Button
          isDisabled={loggedInUser === null}
          onClick={logout}
          color="white"
          bg="gray.500"
          letterSpacing={1}
          fontSize="1.2rem"
          _hover={{
            bg: "gray.600",
          }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
