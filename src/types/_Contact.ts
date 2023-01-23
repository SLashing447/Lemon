export default interface _Contact {
    username: string;
    photoURL: string;
    update: string | null;
    UID: string; // UID on the database and exception for folder mode
    type?: "folder";
    parent?: string;
}
