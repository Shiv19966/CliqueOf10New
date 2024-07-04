const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const port = 8080;
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

var serviceAccount = require("./client-chat-app-cf8d4-firebase-adminsdk-5psq0-437c5e15d6.json");
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "client-chat-app-cf8d4.firebaseapp.com",
});

const db = admin.firestore();
app.post("/register", async (req, res) => {
  const { name, interests } = req.body;
  await db.collection("users").add({ name, interests });
  res.status(201).send("User registered");
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create-user.html"));
});
app.post("/submit-interests", async (req, res) => {
  const { userId, interests } = req.body;
  const userRef = db.collection("users").doc(userId);
  await userRef.update({ interests });
  res.status(200).send("Interests submitted");
});

app.get("/groups", async (req, res) => {
  // Implement logic to retrieve matched groups
  res.status(200).send("Groups retrieved");
});
app.post("/send-message", async (req, res) => {
  const { groupId, message } = req.body;
  const groupRef = db.collection("groups").doc(groupId);
  await groupRef
    .collection("messages")
    .add({ message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
  res.status(201).send("Message sent");
});
app.get("/admin/users", async (req, res) => {
  const usersSnapshot = await db.collection("users").get();
  const users = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).json(users);
});
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const role = decodedToken.role;

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send("Unauthorized");
  }
};
app.post("/api/createUser", async (req, res) => {
  try {
    const { displayName, password, email, role } = req.body;

    if (!displayName || !password || !email || !role) {
      return res.status(400).send({ message: "Missing fields" });
    }

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      displayName,
      password,
      email,
    });

    // Set custom claims (role) for the user
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    return res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).send({ message: "Failed to create user" });
  }
});

app.post("/updateUser", verifyToken, async (req, res) => {
  const { uid, updateData } = req.body;
  if (!uid || !updateData) {
    return res.status(400).send("User ID and update data are required");
  }

  try {
    await admin.auth().updateUser(uid, updateData);
    res.send("User updated successfully");
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

app.post("/deleteUser", verifyToken, async (req, res) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).send("User ID is required");
  }

  try {
    await admin.auth().deleteUser(uid);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});
app.post("/setAdmin", verifyToken, async (req, res) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).send("User ID is required");
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.send("User set as admin successfully");
  } catch (error) {
    res.status(500).send("Error setting admin role: " + error.message);
  }
});
app.get("/users", verifyToken, async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );
    console.log(users, 100);
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});
app.delete("/admin/users/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("users").doc(id).delete();
  res.status(200).send("User deleted");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
