// Settings.js
import React, { useEffect, useState } from "react";
import "./Settings.css"; // Import your CSS file for styling
import { auth } from "../config";
import AdminPage from "./AdminPage";
import { onAuthStateChanged } from "firebase/auth";
const Settings = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        console.log(idTokenResult.claims.admin, 100);
        setAdmin(!!idTokenResult.claims.admin);
        // });
      } else {
      
        setAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);
  console.log(auth?.currentUser?.customClaims?.admin);
  return !admin ? (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-content">
        <p>This is the settings page content.</p>
        {/*  */}
      </div>
      <button className="signout-button" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  ) : (
    <div>
      <AdminPage />
      <button className="signout-button" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default Settings;
