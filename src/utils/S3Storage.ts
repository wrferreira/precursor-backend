import aws, { S3 } from 'aws-sdk';

require('dotenv').config();

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
      const date = new Date().toLocaleDateString().split('/').reverse().join('-');
      const time = new Date().toLocaleTimeString([], { hour12: false }).split(':').join('-');

      const contentType = file.originalname.split('.').pop();

      const params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET || '',
        Body: file.buffer,
        Key: `${date}--${time}${file.originalname}`.replace(/\s/g, ''),
        ContentType: contentType,
      };

      if (contentType == 'svg') {
        params.ContentType = 'image/svg+xml';
      }

      try {
        const data = await this.client.upload(params).promise();

        if (data) {
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

    getVideoStream(key: any, startByte: any, endByte: any) {
      const params = {
        Bucket: process.env.BUCKET || '',
        Key: `${key}`,
        Range: `bytes=${startByte}-${endByte}`,
      };
  
      return this.client.getObject(params).createReadStream();
    }
  
    async getVideoSize(key: any) {
      const params = {
        Bucket: process.env.BUCKET || '',
        Key: `${key}`
      };
  
      const data = await this.client.headObject(params).promise();
      return data.ContentLength;
    }
}