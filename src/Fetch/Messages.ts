import _Message from "../types/_Message";

// const dummy serverr info
// for the message
const date = new Date();
const Messages: _Message[] = [
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "Sup !",
        date: "12/16/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "😭😭 - all guud",
        date: "12/16/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "leaving this town forever ig ",
        date: "12/16/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "i've been meaning to tell you something",
        date: "12/16/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.her",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/17/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/18/2022",
    },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "just wanted you to know this before you go",
        date: "12/18/2022",
    },
];

export default function getMessages(): Promise<_Message[]> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Messages);
        }, 50);
    });
}
