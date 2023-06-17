export default class StreamBuffer { 
    static createStreamFromBuffer(buffer: any) {
        const { Readable } = require('stream');
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
}