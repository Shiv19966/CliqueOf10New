import React, { useEffect, useState } from "react";
import { auth, firestore } from "../config";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import "./Dashboard.css"; 

const defaultInterests = ["", "", "", "", ""];

const Dashboard = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(firestore, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };

    fetchUserData();
  }, []);

  const setInterest = async () => {
    try {
      const userDocRef = doc(firestore, "users", auth.currentUser.uid);

      await setDoc(userDocRef, user, { merge: true });
      console.log("User interests updated successfully");

      for (const interest of user.interests) {
        if (interest) {
          const interestGroupRef = doc(firestore, "interests", interest);
          const interestGroupSnap = await getDoc(interestGroupRef);

          if (interestGroupSnap.exists()) {
            
            await updateDoc(interestGroupRef, {
              users: arrayUnion(auth.currentUser.uid),
            });
          } else {
            
            await setDoc(interestGroupRef, {
              users: [auth.currentUser.uid],
            });
          }
        }
      }
      alert("User interests updated successfully");
    } catch (error) {
      console.error("Error updating user interests: ", error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p>User: {auth.currentUser?.displayName}</p>
      <p>Email: {auth.currentUser?.email}</p>

      <h3>Interests:</h3>
      {user.interests &&
        user.interests.map((data, i) => (
          <div key={i}>
            <input
              className="interest-input"
              onChange={(e) =>
                setUser((prev) => {
                  const newInterests = [...prev.interests];
                  newInterests[i] = e.target.value;
                  return { ...prev, interests: newInterests };
                })
              }
              value={data || ""}
              placeholder={`Interest ${i + 1}`}
            />
          </div>
        ))}

      <button className="update-button" onClick={setInterest}>
        Update Interests
      </button>
    </div>
  );
};

export default Dashboard;
