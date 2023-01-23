import UserQuery from "./UserQuery/UserQuery";
import Contacts from "./Contacts/Contacts";
import Search from "./Search/Search";
import _Contact from "../../../types/_Contact";
import getContacts from "../../../Fetch/Contacts";
import { useEffect, useState } from "react";
import { ContactsPageProps } from "../Pages";
import Modal from "../../Generic/Modal/Modal";
import styled from "styled-components";
import { IoArrowBackOutline } from "react-icons/Io5";

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
    const [contactRoute, setContactRoute] = useState<string>("/");

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
                return;
            }
            if (contactRoute !== "/") {
                onBackContactFolder();
            }
        }
    };

    const _setSrchText = (text: string) => {
        setSrchText(text);
    };
    const onContactClick = (data: _Contact, index: number) => {
        if (data.type === "folder") {
            setContactRoute(data.UID);
            // every folder has a UID
            // and a type which is 'folder' and that is checked in this if-cluase
            // every contact has parent route which can be base : "/" or something
            // else like : "work | dunder Mifflin" , so it will be put to
            // that particular folder with that "route" aka UID

            return;
        }

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

    const onBackContactFolder = () => {
        setContactRoute("/");
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
            {contactRoute !== "/" && !srchView && (
                <Header className="flex flexBetween">
                    <div
                        onClick={onBackContactFolder}
                        className="icon flex flexCenter"
                    >
                        <IoArrowBackOutline />
                    </div>
                    <h2> {contactRoute}</h2>
                    <div className="icon flex flexCenter">
                        <IoArrowBackOutline />
                    </div>
                </Header>
            )}
            <Contacts
                contactRoute={contactRoute} // contact Route determines the redering of the Contact selectors :)
                selected={selectedChat}
                visible={!srchView}
                onClick={onContactClick}
                contacts={contacts}
            />
        </>
    );
}

const Header = styled.div`
    display: flex;

    padding: 0.45rem 1rem;

    margin: 0 0.5rem;

    animation: selShowAnim 0.2s linear;

    > .icon {
        font-size: 1.8rem;
        /* border: 1px solid white; */
        border-radius: 50%;
        /* cursor: pointer; */
        cursor: pointer;
        transition: 0.12s all ease;

        :hover {
            background-color: #ffffff14;
        }

        > svg > path {
            color: #a0a0a0;
        }
    }
    h2 + .icon {
        visibility: hidden;
    }
`;
