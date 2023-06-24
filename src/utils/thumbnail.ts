import path from 'path';

const ffmpeg = require('fluent-ffmpeg');

export default class Thumbnail { 
    async generate(file: any) {
        // const videoPath = path.resolve(multerConfig.directory, file.filename);
        // const thumbnailPath = path.join(multerConfig.directory);

        // console.log(videoPath, file.filename);

        // ffmpeg({ source: videoPath }).thumbnail({
        //     filename: `${file.filename.split('.')[0]}.jpg`,
        //     folder: multerConfig.directory,
        //     timemarks: [2]
        // }, '.');
    }
}