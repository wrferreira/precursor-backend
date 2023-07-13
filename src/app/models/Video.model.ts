export default interface Video {
    id?: number;
    title: string;
    initial_text: string;
    letter: string;
    key: string;
    thumb_key: string;
    allowDownload: boolean;
    createAt: Date;
}