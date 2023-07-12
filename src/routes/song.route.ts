import express from "express";
import SongController from "../controllers/Song.controller";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const SongRouter = express.Router();

SongRouter.post('/create', upload.any(), new SongController().uploadSong);

SongRouter.get('/list', new SongController().listSongs);

SongRouter.get('/stream/:id', new SongController().stream); 

SongRouter.get('/:id', new SongController().getSong);