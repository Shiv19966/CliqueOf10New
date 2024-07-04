import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config";
import "./AdminPage.css";
import { fetchUsers, setAdmin, deleteUser } from "../helpers/api";

import { auth } from "../config";
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = await auth.currentUser.getIdToken(true);
        const users = await fetchUsers(token);
        console.log(users, 21, 21);
        for (let i = 0; i < users.length; i++) {
          console.log(users[i].customClaims, 25);
        }
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(await auth.currentUser.getIdToken(true));

      try {
        const usersCollectionRef = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const allUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users: ", error.message);
      }
    };

    // fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      handleDeleteUser(userId);
      console.log(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    }
  };
  const handleDeleteUser = async (userId) => {
    console.log(userId);
    try {
      const token = await auth.currentUser.getIdToken(true);
      await deleteUser(token, userId);
      alert("User deleted successfully");
    } catch (error) {
      alert("Error deleting user: " + error.message);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditValue(user.displayName || user.email);
  };

  const handleUpdate = async () => {
    if (!editUser) return;

    try {
      await updateDoc(doc(firestore, "users", editUser.id), {
        displayName: editValue,
      });
      setUsers(
        users.map((user) =>
          user.id === editUser.id ? { ...user, displayName: editValue } : user
        )
      );
      setEditUser(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating user: ", error.message);
    }
  };

  const handleSetAdmin = async () => {
    try {
      const token = await auth.currentUser.getIdToken(true);
      await setAdmin(token, auth.currentUser.uid);
      alert("User set as admin successfully");
    } catch (error) {
      alert("Error setting admin role: " + error.message);
    }
  };
  return (
    <div className="admin-container">
      <h2>Admin Page</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editUser && editUser.id === user.id ? (
              <div>
                {console.log(user, 113)}
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{user.email}</span>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.uid)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* <button onClick={() => handleSetAdmin()}>Set Admin</button> */}
    </div>
  );
};

export default AdminPage;
