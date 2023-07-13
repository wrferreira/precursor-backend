import express from "express";
import UserController from '../controllers/User.controller';
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const UserRouter = express.Router();

UserRouter.get('/', AuthMiddleware, new UserController().getUsers);
UserRouter.post('/authGoogle', new UserController().getUserGoogle);
UserRouter.post('/login', new UserController().loginUser);
UserRouter.post('/register', new UserController().registerUser);