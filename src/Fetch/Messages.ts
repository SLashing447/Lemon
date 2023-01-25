import _Message from "../types/_Message";

// const dummy serverr info
// for the message
const date = new Date();
const Messages: _Message[] = [
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: {
            text: "How are you !",
        },
        reply: "AISHIK@How are you !",
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        reply: "AISHIK@How are you !",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hello 👋👋" },
        time: "12:10 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
    {
        data: { text: "hiii 👋👋" },
        time: "12:11 AM",
        uid: "123.they",
        date: "1/18/2023",
    },
    {
        data: { text: "sup !" },
        time: "12:12 AM",
        uid: "123.me",
        date: "1/18/2023",
    },
];

export default function getMessages(): Promise<_Message[]> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Messages);
        }, 50);
    });
}
