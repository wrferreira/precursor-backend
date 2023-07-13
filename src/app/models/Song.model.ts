export default interface Song {
    id?: number;
    title: string;
    initial_text: string;
    letter: string;
    key: string;
    allow_download: boolean;
    create_at: Date;
}