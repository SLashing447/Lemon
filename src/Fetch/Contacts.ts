import _Contact from "../types/_Contact";

// dummy serever info
const conts: _Contact[] = [
    {
        username: "Work | Dunder Mifflin",
        photoURL:
            "https://m.media-amazon.com/images/G/01/digital/INVI_2021_PVProfileImageCircle_256x256_OmniMan_DarkBlue.png",
        update: "12 new messages from 10 groups",
        UID: "Work | Dunder Mifflin",
        type: "folder",
    },

    // work contacts
    {
        username: "Dwight Kurt Schrute",
        photoURL:
            "https://www.myany.city/sites/default/files/styles/scaled_cropped_medium__260x260/public/field/image/node-related-images/sample-dwight-k-schrute.jpg?itok=8TfRscbA  q",
        update: "Wear Tuxedo Idiot !",
        UID: "user123",
        parent: "Work | Dunder Mifflin",
    },
    {
        username: "Michael Scott",
        photoURL:
            "https://pbs.twimg.com/profile_images/563105554822737921/F-iH3BMT_400x400.png",
        update: "I'm Watching You 👁️",
        UID: "user123",
        parent: "Work | Dunder Mifflin",
    },

    // normal contacts
    {
        username: "Slashing_corgi",
        photoURL: "https://randomuser.me/api/portraits/men/61.jpg",
        update: null,
        UID: "user123",
    },
    {
        username: "_slam123",
        photoURL: "https://randomuser.me/api/portraits/men/21.jpg",
        UID: "user123",

        update: "Hello World My Name is AIshik Chakraborty",
    },
    {
        username: "hermit_fi",
        photoURL: "https://randomuser.me/api/portraits/women/21.jpg",
        update: null,
        UID: "user123",
    },
    {
        username: "geo69",
        photoURL: "https://randomuser.me/api/portraits/men/11.jpg",
        update: null,
        UID: "user123",
    },
    {
        username: "Nutan_5",
        photoURL: "https://randomuser.me/api/portraits/men/91.jpg",
        update: "Hello World &@&9",
        UID: "user123",
    },
];

interface props {
    limit?: number;
}

export default async function getContacts(): Promise<_Contact[]> {
    // const id = localStorage.getItem("_id");
    // using the id to fetch the contacts
    // const { limit } = props;

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(conts);
        }, 50);
    });
}
