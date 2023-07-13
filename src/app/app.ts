const express = require('express');
const cors = require('cors');

import { responseMiddleware } from "./middleware/ResponseMiddleware";
import { SongRouter } from "./routes/song.route";
import { SongUserRouter } from "./routes/song_user.route";
import { UserRouter } from "./routes/user.route";
import { VideoRouter } from "./routes/video.route";

class App {
    express: any;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use((_req: any, res: any, next: any) => {
            res.header("Access-Controll-Allow-Origin", "*")
            res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE")
            res.header("Access-Controll-Allow-Headers", "Access, Content-type, Authorization, Acept, Origin, X-Requested-With");
            
            next();
        })
        this.express.use(responseMiddleware);
    }

    routes(): void {
        this.express.use('/user', UserRouter);
        this.express.use('/song', SongRouter);
        this.express.use('/song-user', SongUserRouter);
        this.express.use('/video', VideoRouter);
    }
}

module.exports = new App().express;