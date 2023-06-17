import express from "express";
import VideoController from "../controllers/Video.controller";
import multerConfig from '../config/multer';

const multer = require('multer');

const upload = multer(multerConfig);

// const upload = multer({
//   dest: './files/',
//   limits: { fieldSize: 50 * 1024 * 1024 },
// });

export const VideoRouter = express.Router();

VideoRouter.post('/create', upload.single('file'), new VideoController().uploadVideo);

VideoRouter.get('/:id', new VideoController().getVideo);

VideoRouter.get('/stream/:id', new VideoController().stream);