import axios from "axios";

const API_URL = "https://todoapp-backend-ycgo.onrender.com";

export const register = (userData) => {
  return axios.post(
    `${API_URL}/api/users`,
    { ...userData },
    { withCredentials: true }
  );
};

export const login = (loginData) => {
  return axios.post(
    `${API_URL}/api/users/login`,
    { ...loginData },
    { withCredentials: true }
  );
};

export const getTasks = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/api/tasks`, config);
};

export const getCompletedTasks = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/api/tasks/completed`, config);
};

export const getIncompletedTasks = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/api/tasks/incompleted`, config);
};

export const addTask = (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${API_URL}/api/tasks`, { ...taskData }, config);
};

export const updateTaskStatus = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${API_URL}/api/tasks/${id}`, {}, config);
};

export const deleteTask = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}/api/tasks/${id}`, config);
};
