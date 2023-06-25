import express from "express";
import VideoController from "../controllers/Video.controller";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const VideoRouter = express.Router();

VideoRouter.post('/create', upload.any(), new VideoController().uploadVideo);

VideoRouter.get('/:id', new VideoController().getVideo);

VideoRouter.get('/list', new VideoController().listVideos);

VideoRouter.get('/stream/:id', new VideoController().stream);