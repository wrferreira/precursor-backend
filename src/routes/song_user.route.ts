import express from "express";
import SongUserController from "../controllers/Song_user.controller";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const SongUserRouter = express.Router();

SongUserRouter.post('/create', upload.any(), new SongUserController().uploadSong);

SongUserRouter.get('/list/:id', new SongUserController().listSongsByUser);

SongUserRouter.get('/stream/:id', new SongUserController().stream); 

SongUserRouter.get('/:id', new SongUserController().getSongById);