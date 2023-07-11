const express = require('express');
const cors = require('cors');

import { PlansRouter } from "./routes/plans.route";
import { SessionRouter } from "./routes/session.route";
import { SongRouter } from "./routes/song.route";
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
        this.express.use(express.json());
        this.express.use((_req: any, res: any, next: any) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Credentials", "true")
            res.header("Access-Control-Allow-Headers", "content-type")
            res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH")
            this.express.use(cors())
            next();
        })
    }

    routes(): void {
        this.express.use('/user', UserRouter);
        this.express.use('/session', SessionRouter);
        this.express.use('/song', SongRouter);
        this.express.use('/plans', PlansRouter);
        this.express.use('/video', VideoRouter);
    }
}

module.exports = new App().express;