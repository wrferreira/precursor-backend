import path from 'path';
import crypto from 'crypto';

const multer = require('multer');

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req: any, file: any, cb: any) {
            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash}-${file.originalname}`;

            return cb(null, filename);
        }
    })
}