import express from "express";
import UserController from '../controllers/User.controller';

export const UserRouter = express.Router();

UserRouter.get('/', new UserController().getUsers)
