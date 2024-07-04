
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../config"; 
import "./MatchGroups.css"; 
import GroupUsers from "./GroupUsers";

const MatchGroups = () => {
  const [groups, setGroups] = useState([]);
  const [showUsers, setShowUsers] = useState(null);

  useEffect(() => {
    const fetchUsersAndInterests = async () => {
      const usersCollectionRef = collection(firestore, "interests");
      try {
    
        const usersSnapshot = await getDocs(usersCollectionRef);
        const allUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(
          allUsers.filter((data) => data.users.includes(auth.currentUser.uid))
        );
        
        const matchedGroups = allUsers.filter((data) =>
          data.users.includes(auth.currentUser.uid)
        );
      
        setGroups(matchedGroups);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersAndInterests();
  }, []);

  const matchGroupsByInterests = (users) => {
    
    const groups = {};

    users.forEach((user) => {
      user.interests.forEach((interest) => {
        console.log(interest);
        if (!groups[interest]) {
          groups[interest] = [];
        }
        groups[interest].push(user);
      });
    });
    console.log(Object.entries(groups));
    return Object.entries(groups);
  };

  return showUsers ? (
    <GroupUsers setShowUsers={setShowUsers} showUsers={showUsers} />
  ) : (
    <div className="match-groups-container">
      <h2>Matched Groups</h2>

      <div className="group-list">
        {groups.map((group, index) => (
          <div
            onClick={() => setShowUsers(group)}
            key={index}
            className="group"
          >
            <h3>Group Name: {group.id} </h3>
            {console.log(group)}
            <p>Users: {group.users.length}</p>
            {/* <ul>
              {group.map((user) => (
                <li key={user.id}>
                  {user.name} - Interests: {user.interests.join(", ")}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchGroups;
