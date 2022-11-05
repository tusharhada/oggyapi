import express from "express";
const router = express.Router();
import firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert("./cert.json"),
  // databaseURL: 'https://<my_project>.firebaseio.com'
});

export const getToken = async (req, res) => {
  const mob = req.body.mobile;

  if (mob.toString().length == 10) {
    firebaseAdmin
      .auth()
      .createCustomToken(mob.toString())
      .then(function (token) {
        res.json({ token: token });
      })
      .catch(function (error) {
        res.status(500).json({ error: "Error during token creation" });
      });
  } else {
    res.status(500).json({ error: "Invalid Mobile number" });
  }
};

export default router;
