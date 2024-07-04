// import { Request, Response } from "express";
// import * as admin from "firebase-admin";

// // Route handler to create a user with custom role
// export async function createUser(req: Request, res: Response) {
//   try {
//     const { displayName, password, email, role } = req.body;

//     if (!displayName || !password || !email || !role) {
//       return res.status(400).send({ message: "Missing fields" });
//     }

//     // Create user in Firebase Authentication
//     const userRecord = await admin.auth().createUser({
//       displayName,
//       password,
//       email,
//     });

//     // Set custom claims (role) for the user
//     await admin.auth().setCustomUserClaims(userRecord.uid, { role });

//     return res.status(201).send({ uid: userRecord.uid });
//   } catch (error) {
//     console.error("Error creating user:", error.message);
//     return res.status(500).send({ message: "Failed to create user" });
//   }
// }
