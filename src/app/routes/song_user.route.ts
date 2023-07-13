import express from "express";
import SongUserController from "../controllers/Song_user.controller";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const SongUserRouter = express.Router();

SongUserRouter.post('/create', AuthMiddleware, upload.any(), new SongUserController().uploadSong);

SongUserRouter.get('/list/:id', AuthMiddleware, new SongUserController().listSongsByUser);

SongUserRouter.get('/stream/:id', AuthMiddleware,  new SongUserController().stream); 

SongUserRouter.get('/:id', AuthMiddleware, new SongUserController().getSongById);