import _Contact from "../types/_Contact";

// dummy serever info
const conts: _Contact[] = [
    {
        username: "Slashing_corgi",
        photoURL: "https://randomuser.me/api/portraits/men/61.jpg",
        update: null,
    },
    {
        username: "_slam123",
        photoURL: "https://randomuser.me/api/portraits/men/21.jpg",

        update: null,
    },
    {
        username: "hermit_fi",
        photoURL: "https://randomuser.me/api/portraits/women/21.jpg",
        update: null,
    },
    {
        username: "geo69",
        photoURL: "https://randomuser.me/api/portraits/men/11.jpg",
        update: null,
    },
    {
        username: "Nutan_5",
        photoURL: "https://randomuser.me/api/portraits/men/91.jpg",
        update: null,
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
