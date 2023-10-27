import { create } from "zustand";

const user = JSON.parse(localStorage.getItem('user'));
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const taskStore = (set) => ({
    tasks: [],
    tasksType: "all",
    user: user ? user : null,
    loggedInUser: loggedInUser !== null ? loggedInUser : null, 
    isLoading: false,

    setTasks: (tasks) => set({tasks}),
    setTasksType: (tasksType) => set({tasksType}),
    setUser: (user) => set({user}),
    setLoggedInUser: (loggedInUser) => set({loggedInUser}),
    setIsLoading: (isLoading) => set({isLoading}),
});

const useTaskStore = create(taskStore);
export default useTaskStore;