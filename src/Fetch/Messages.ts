import _Message from "../types/_Message";

// const dummy serverr info
// for the message
const date = new Date();
const Messages: _Message[] = [
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "Hiiiii 👋",
        date: "12/18/2022",
    },
    {
        uid: "123.they",
        time: "12:31 PM",
        data: "Hello 👋",
        date: "12/18/2022",
    },
    // {
    //     uid: "123.her",
    //     time: "12:31 PM",
    //     reply: "Aishik@Hello 👋",
    //     data: "Hii",
    //     date: "12/18/2022",
    // },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: "iuyq wgdiqu deqwiuof gqweiuof gqweiufo gwqefiu weqf eqwiuf weiuf gweqiouf gewiufg weqiuof qweiuof gewqiuofg eqwiuf weqiuf wequfi wfiu gwefiuoewg feiquwgf weqiufg ewiuf ewuifg ewqiufg weqiuofg eqwiouf gwequiof gweqfiug weqiuf gweqiufg ewqf we wqeuif weq gwqeiuf gwqefiu wegqfiuog eqwfg eqwufiog wqefiuog eqwufiog wqeiufgeqw iuf gwfiuewg fuiweqg weiufg weuiofgg wequiof gqwefiu gwe",
        date: "12/18/2022",
        // spoiler: true,
    },
    // {
    //     uid: "123.me",
    //     time: "12:31 PM",
    //     data: "Hello 👋",
    //     date: "12/18/2022",
    // },
    // {
    //     uid: "123.her",
    //     time: "12:31 PM",
    //     reply: "Aishik@Hello 👋 iuyq wgdiqu deqwiuof gqweiuof gqweiufo gwqefiu weqf eqwiuf weiuf gweqiouf gewiufg weqiuof qweiuof gewqiuofg eqwiuf weqiuf wequfi wfiu gwefiuoewg feiquwgf weqiufg ewiuf ewuifg ewqiufg weqiuofg eqwiouf gwequiof gweqfiug weqiuf gweqiufg ewqf we wqeuif weq gwqeiuf gwqefiu wegqfiuog eqwfg eqwufiog wqefiuog eqwufiog wqeiufgeqw iuf gwfiuewg fuiweqg weiufg weuiofgg wequiof gqwefiu gwe",
    //     data: "Hii",
    //     date: "12/18/2022",
    //     spoiler: true,
    // },
    // {
    //     uid: "123.me",
    //     time: "12:31 PM",
    //     data: "iuyq wgdiqu deqwiuof gqweiuof gqweiufo gwqefiu weqf eqwiuf weiuf gweqiouf gewiufg weqiuof qweiuof gewqiuofg eqwiuf weqiuf wequfi wfiu gwefiuoewg feiquwgf weqiufg ewiuf ewuifg ewqiufg weqiuofg eqwiouf gwequiof gweqfiug weqiuf gweqiufg ewqf we wqeuif weq gwqeiuf gwqefiu wegqfiuog eqwfg eqwufiog wqefiuog eqwufiog wqeiufgeqw iuf gwfiuewg fuiweqg weiufg weuiofgg wequiof gqwefiu gwe",
    //     date: "12/18/2022",
    // },
    // {
    //     uid: "123.me",
    //     time: "12:31 PM",
    //     data: "Hello 👋",
    //     date: "12/18/2022",
    // },
    // {
    //     uid: "123.her",
    //     time: "12:31 PM",
    //     reply: "Aishik@Hello 👋",
    //     data: "Hii",
    //     date: "12/18/2022",
    // },
    {
        uid: "123.me",
        time: "12:31 PM",
        data: " -#$#%#- https://i.ytimg.com/vi/_ZTiUEZbKOE/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA-CHTzKTgqBl1jiKWW0BirbSUu4Q",
        date: "12/18/2022",
    },
    // {
    //     uid: "123.me",
    //     time: "12:31 PM",
    //     data: "iuyq wgdiqu deqwiuof gqweiuof gqweiufo gwqefiu weqf eqwiuf weiuf gweqiouf gewiufg weqiuof qweiuof gewqiuofg eqwiuf weqiuf wequfi wfiu gwefiuoewg feiquwgf weqiufg ewiuf ewuifg ewqiufg weqiuofg eqwiouf gwequiof gweqfiug weqiuf gweqiufg ewqf we wqeuif weq gwqeiuf gwqefiu wegqfiuog eqwfg eqwufiog wqefiuog eqwufiog wqeiufgeqw iuf gwfiuewg fuiweqg weiufg weuiofgg wequiof gqwefiu gwe",
    //     date: "12/18/2022",
    // },
];

export default function getMessages(): Promise<_Message[]> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Messages);
        }, 50);
    });
}
