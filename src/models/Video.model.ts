export default class Video {
    constructor() {}

    id?: number;
    title!: string;
    initialText!: string;
    letter!: string;
    key!: string;
    thumbKey!: string;
    allowDownload!: boolean;
    createAt!: Date;
}