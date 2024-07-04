import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../config"; 
import "./GroupUsers.css"; 
import { auth } from "../config";
const GroupUsers = ({ interest, showUsers, setShowUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(firestore, "users");

      try {
        // Fetch 
        const usersSnapshot = await getDocs(usersCollectionRef);
        const allUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(
          allUsers.filter((data) => showUsers.users.includes(data.id)),
          20,
          showUsers
        );
        const filteredData = allUsers.filter((data) =>
          showUsers.users.includes(data.id)
        );
        setUsers(filteredData);

      
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="group-users-container">
      <h2>{showUsers.id} Group</h2>
      <p>Users List:</p>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            {/* <p>Interests: {user.interests.join(", ")}</p> */}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowUsers(null)}>Back</button>
    </div>
  );
};

export default GroupUsers;
