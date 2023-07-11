import express from "express";
import UserController from '../controllers/User.controller';

export const UserRouter = express.Router();

UserRouter.get('/', new UserController().getUsers);
UserRouter.post('/authGoogle', new UserController().getUserGoogle);
UserRouter.post('/login', new UserController().loginUser);
UserRouter.post('/register', new UserController().registerUser);