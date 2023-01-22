export default interface _Message {
    data: { photoURL?: string; text: string };
    time: string;
    uid: string;
    reply?: string;
    date?: any;
    spoiler?: boolean;
}
// here uid is the uid of the sender
// if reply exists it will have a reply text or image or both(seperated by " -###- ")
