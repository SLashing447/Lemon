import UserQuery from "./UserQuery/UserQuery";
import Contacts from "./Contacts/Contacts";
import Search from "./Search/Search";
import _Contact from "../../../types/_Contact";
import getContacts from "../../../Fetch/Contacts";
import { useEffect, useState } from "react";
import { ContactsPageProps } from "../Pages";
import Modal from "../../Generic/Modal/Modal";

interface ContactPage {
    data: ContactsPageProps;
    setRoute: (data: string) => void;
}

// ! Contacts View Page (CHATS)
export default function ContactPage(props: ContactPage) {
    const { setChatData, _keyPress, selectedChat, setSelectedChat } =
        props.data;
    const { setRoute } = props; // routing from the dropdown menu in the search bar of contact page

    const [srchView, setSrchView] = useState(false);
    const [srchText, setSrchText] = useState("");
    const [contacts, setContacts] = useState<Array<_Contact> | null>(null);
    const [folderCreateMoldal, setFolderCreateModal] = useState(false);
    // const [isUserQueryView, setUserQueryView] = useState(false); //
    // const [selectedChat, setSelectedChat] = useState(-1);
    // const [pageIndexName, setPageIndexName] = useState("");

    // useEffect(() => {
    //     // setSelectedChat(selChat);
    //     console.log(selChat + "🥵🥵🥵🥵🥵");
    // }, [selChat]);

    useEffect(() => {
        FetchContacts();
    }, []);
    const FetchContacts = () => getContacts().then(setContacts);

    useEffect(() => onKeyPress(_keyPress), [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (key === "Escape") {
            if (srchView) {
                setSrchView(false);
            }
        }
    };

    const _setSrchText = (text: string) => {
        setSrchText(text);
    };
    const onContactClick = (data: _Contact, index: number) => {
        setSelectedChat(index);
        setChatData(data);
    };

    // Middle Man , setRoute , createFolder modal purpose
    const _setRoute = (data: string) => {
        if (data === "Folder") {
            setFolderCreateModal(true);
            return;
        } else {
            setRoute(data);
        }
    };

    const killCreateFolderModal = () => {
        setFolderCreateModal(false);
    };

    return (
        <>
            <Search
                _keyPress={_keyPress}
                srchView={srchView}
                setSrchText={_setSrchText}
                setSrchView={setSrchView}
                setRoute={_setRoute}
            />
            <UserQuery text={srchText} visible={srchView} />

            {folderCreateMoldal && (
                <Modal kill={killCreateFolderModal}>
                    <li>Some func</li>
                    <li>Some func</li>
                    <li>Some func</li>
                    <li>Some func</li>
                </Modal>
            )}

            <Contacts
                selected={selectedChat}
                visible={!srchView}
                onClick={onContactClick}
                contacts={contacts}
            />
        </>
    );
}
