// src/api.js
import axios from "axios";
const localUrl = process.env.REACT_APP_API_URL;
export const fetchUsers = async (token) => {
  try {
    const response = await axios.get(`${localUrl}/users`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// src/api.js

export const setAdmin = async (token, uid) => {
  try {
    const response = await axios.post(
      `${localUrl}/setAdmin`,
      { uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error setting admin role:", error);
    throw error;
  }
};

// src/api.js

export const deleteUser = async (token, uid) => {
  try {
    const response = await axios.post(
      `${localUrl}/deleteUser`,
      { uid },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (token, uid, updateData) => {
  try {
    const response = await axios.post(
      `${localUrl}/updateUser`,
      { uid, updateData },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
