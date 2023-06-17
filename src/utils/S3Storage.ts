import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';

require('dotenv').config();

import multerConfig from '../config/multer';
import File from '../models/File.model';

export default class S3Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'sa-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })
    }

    async saveFile(file: any): Promise<File | void> {
        const originalPath = path.resolve(multerConfig.directory, file.filename);

        const date = new Date().toLocaleDateString().split('/').reverse().join('-');
        const time = new Date().toLocaleTimeString([], { hour12: false }).split(':').join('-');

        const contentType = originalPath.split('.').pop();

        const params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET || '',
            Body: fs.createReadStream(originalPath),
            Key: `${date}--${time}${file.filename}`.replace(/\s/g, ''),
            ContentType: contentType,
        };

        if (contentType == 'svg') {
            params.ContentType = 'image/svg+xml';
        }

        try {
            const data = await this.client.upload(params).promise();
            
            if (data) {
              fs.unlinkSync(originalPath);
              const fileResult = {
                key: data.Key,
                type: file.mimetype ? file.mimetype : null
              } as File;

              return fileResult;
            }
          } catch (error) {
            console.log("ERROR", error)
            return;
          }
    }

    async getFile(id: string): Promise<any> {

      const params = {
        Bucket: process.env.BUCKET || '',
        Key: `${id}.mp4`,
      };

      const { Body } = await this.client.getObject(params).promise();
      return Body;
    }
}