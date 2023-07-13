import express from "express";
import SongController from "../controllers/Song.controller";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const SongRouter = express.Router();

SongRouter.post('/create', AuthMiddleware, upload.any(), new SongController().uploadSong);

SongRouter.get('/list', AuthMiddleware, new SongController().listSongs);

SongRouter.get('/stream/:id', AuthMiddleware, new SongController().stream); 

SongRouter.get('/:id', AuthMiddleware, new SongController().getSong);