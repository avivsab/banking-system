import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/login', (req, res) => {
    userController.login(req, res);
});

router.post('/logout', (req, res) => {
    userController.logout(req, res);
});

router.post('/createuser', (req, res) => {
    userController.createUser(req, res);
});

export default router;
