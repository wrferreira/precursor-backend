import express from "express";
import VideoController from "../controllers/Video.controller";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const multer = require('multer');

const upload = multer({
    limits: { fieldSize: 50 * 1024 * 1024 },
});

export const VideoRouter = express.Router();

VideoRouter.post('/create', AuthMiddleware, upload.any(), new VideoController().uploadVideo);

VideoRouter.get('/list', AuthMiddleware, new VideoController().listVideos);

VideoRouter.get('/stream/:id', AuthMiddleware, new VideoController().stream);

VideoRouter.get('/:id', AuthMiddleware, new VideoController().getVideo);