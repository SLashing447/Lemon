export default interface _Message {
    data: string;
    time: string;
    uid: string;
    reply?: string;
    date?: any;
}
// here uid is the uid of the sender
// if reply exists it will have a reply text or image or both(seperated by " -###- ")
