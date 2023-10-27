import React from "react";
import { useEffect, useRef } from "react";
import useTaskStore from "../taskStore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  addTask,
  getTasks,
  getCompletedTasks,
  getIncompletedTasks,
  deleteTask,
  updateTaskStatus,
} from "../utils/apis";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  Stack,
  Text,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export default function MainComponent() {
  const {
    user,
    loggedInUser,
    tasks,
    setTasks,
    isLoading,
    setIsLoading,
    tasksType,
    setTasksType,
  } = useTaskStore();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const taskRef = useRef("");
  const tasksTypeRef = useRef(null);
  const toast = useToast();
  const token =
    loggedInUser !== null
      ? JSON.parse(localStorage.getItem("loggedInUser")).token
      : "";
  let taskInputValue = "";

  useEffect(() => {
    if (loggedInUser === null) {
      navigate("/login");
    }
    else if (loggedInUser !== null) handleGetTasks();
  }, [tasksType]);

  // Method for error catching in try-catch clause
  const catchError = (error) => {
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
  };

  // handling change in Select while selecting the tasksType
  const handleSelectChange = (e) => {
    setTasksType(e.target.value);
  };

  // handling change in input field while adding tasks
  const handleInputChange = () => {
    taskInputValue = taskRef.current.value;
  };

  // Method for adding tasks
  const handleAddTask = async () => {
    setIsLoading(true);
    try {
      const todo = taskInputValue;
      const response = await addTask({ todo }, token);
      if (response.status === 200) {
        tasks.push(response.data);
        setTasks(tasks);
        toast({
          title: "Success",
          description: "Task added successfully!",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      catchError(error);
    }
    setIsLoading(false);
  };

  // Method for getting tasks (all, completed or incompleted)
  const handleGetTasks = async () => {
    setIsLoading(true);
    try {
      let response;

      if (tasksType === "all") response = await getTasks(token);
      else if (tasksType === "completed")
        response = await getCompletedTasks(token);
      else if (tasksType === "incompleted")
        response = await getIncompletedTasks(token);

      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      catchError(error);
    }
    setIsLoading(false);
  };

  // Method for deleting the tasks
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteTask(id, token);
      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
        toast({
          title: "Success",
          description: "Task deleted successfully!",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      catchError(error);
    }
    setIsLoading(false);
  };

  // Method for toggling task status (completed/incompleted)
  const handleCheck = async (id) => {
    setIsLoading(true);
    try {
      const response = await updateTaskStatus(id, token);
      if (response.status === 200) {
        const updatedTasks = tasks.map((task) => {
          if (task._id === id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        });
        setTasks(updatedTasks);
        toast({
          title: "Success",
          description: "Task status updated successfully!",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      catchError(error);
    }
    setIsLoading(false);
  };

  // the list of tasks which is stored in the database and is to be shown
  const tasksList = tasks.map((task, index) => {
    return (
      <Flex
        key={index}
        align="center"
        justify="space-between"
        bg="#ffffff"
        w={["20rem", "37rem"]}
        mb="0.8rem"
        px="0.7rem"
        py="0.4rem"
        borderRadius="0.4rem"
      >
        <Flex>
          <Checkbox
            size="lg"
            mr="1rem"
            isChecked={task.completed}
            onChange={() => handleCheck(task._id)}
          ></Checkbox>
          <Stack maxWidth={["12rem", "28rem"]}>
            <Text
              as={task.completed ? "s" : ""}
              color={task.completed ? "gray.500" : "black"}
              fontWeight="500"
              fontSize="1rem"
            >
              {task.todo}
            </Text>
            <Text color="#585858" fontSize="0.9rem">
              {new Date(task.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </Stack>
        </Flex>
        <Button p={0} onClick={() => handleDelete(task._id)}>
          <MdDelete style={{ width: "25px", height: "25px" }} color="#3d3d3d" />
        </Button>
      </Flex>
    );
  });

  return (
    <>
      <Navbar />
      <Center m={0} p={0}>
        <Stack>
          <Text textAlign="center" fontSize="2rem" fontWeight="500" mb="1.5rem">
            {loggedInUser !== null
              ? `${loggedInUser.name.split(" ")[0]}'s Tasks`
              : ""}
          </Text>
          <Center>
            <Flex
              align="center"
              justify="space-between"
              w={["21rem", "40rem"]}
              mb="1.5rem"
            >
              <Button
                onClick={onOpen}
                bg="#4250f5"
                color="white"
                fontSize="1.1rem"
                mr="20px"
                _hover={{
                  bg: "#2732b8",
                }}
              >
                Add Task
              </Button>
              <Select
                ref={tasksTypeRef}
                onChange={handleSelectChange}
                w={["9rem", "10rem"]}
                fontSize="1.1rem"
                fontWeight="500"
                bg="gray.300"
                defaultValue="all"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incompleted">Incomplete</option>
              </Select>
            </Flex>
          </Center>

          <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={taskRef} size={["xs", "lg"]}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#646681">Add New Task</ModalHeader>
              <ModalCloseButton
                _hover={{
                  bg: "#eb3f3f",
                  color: "white",
                }}
              />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel htmlFor="todo" color="#646681" mb="1rem">
                    Task Description
                  </FormLabel>
                  <Input
                    placeholder="What I have to do?"
                    type="text"
                    name="todo"
                    ref={taskRef}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={3}
                  bg="#4250f5"
                  color="white"
                  letterSpacing={1}
                  _hover={{
                    bg: "#2732b8",
                  }}
                  onClick={() => {
                    taskInputValue
                      ? onClose() & handleAddTask()
                      : toast({
                          title: "Task Error",
                          description: "Cannot add empty task!",
                          status: "error",
                          duration: 1000,
                          isClosable: true,
                          position: "top",
                        });
                  }}
                >
                  Add Task
                </Button>
                <Button
                  onClick={onClose}
                  letterSpacing={1}
                  bg="gray.200"
                  _hover={{
                    bg: "gray.300",
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Flex
            flexDirection="column"
            align="center"
            w={["21rem", "40rem"]}
            bg="#ecedf6"
            mb="2rem"
            pt="1.5rem"
            pb="0.7rem"
            borderRadius="0.4rem"
          >
            {isLoading === true ? (
              <Center>
                <Spinner
                  size="xl"
                  thickness="5px"
                  speed="0.5s"
                  emptyColor="gray.300"
                  color="#4250f5"
                  mb="0.7rem"
                />
              </Center>
            ) : tasks.length === 0 ? (
              <Text mb="0.7rem" fontWeight="500" fontSize="1.4rem">
                No Tasks for{" "}
                {loggedInUser ? loggedInUser.name.split(" ")[0] : ""}
              </Text>
            ) : (
              <Stack>{tasksList}</Stack>
            )}
          </Flex>
        </Stack>
      </Center>
    </>
  );
}
