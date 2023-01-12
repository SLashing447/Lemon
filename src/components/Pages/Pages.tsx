import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/Io5";
import styled, { keyframes } from "styled-components";
import getContacts from "../../Fetch/Contacts";
import _Contact from "../../types/_Contact";
import Contacts from "./Contacts/Contacts/Contacts";
import Search from "./Contacts/Search/Search";
import Devices from "./Devices/Devices";
import Profile from "./Profile/Profile";
import { Settings } from "./Settings/Settings";
import UserQuery from "./UserQuery/UserQuery";

interface ContactsPageProps {
    _keyPress: string | null;
    selectedChat: number;
    setSelectedChat: (val: number) => void;
    setChatData: (data: _Contact | null) => void;
}

interface props {
    ContactPageProps: ContactsPageProps;
    isVisible: boolean;
}

function Pages(props: props) {
    const ContactPageProps = props.ContactPageProps;
    const { Container, Header, OtherPagesContainer } = components;
    const { isVisible } = props;
    const [pageIndexName, setPageIndexName] = useState("chats");
    // const [route, setRoute] = useState("/chats");
    const username = "Slashing_corgi";

    useEffect(() => {
        if (pageIndexName === "Profile") {
            setPageIndexName(username);
        }
    }, [pageIndexName]);

    const onRouteUpdate = (i: string) => {
        setPageIndexName(`${pageIndexName}/${i}`);
    };

    const onBack = () => {
        const _s = pageIndexName.split("/");
        console.log("previos Route ", _s.join("/"));
        _s.pop();
        const name = _s.join("/");
        console.log("Go To Route ", name);

        if (_s.length === 0) {
            setPageIndexName("chats");
            return;
        }

        setPageIndexName(name);
    };

    // On Escape go Back
    useEffect(() => {
        onKeyPress(props.ContactPageProps._keyPress);
    }, [props.ContactPageProps._keyPress]);

    const onKeyPress = (key: string | null) => {
        if (key === "Escape") {
            onBack();
        }
    };

    return (
        <Container isVisible={isVisible}>
            {pageIndexName === "chats" && (
                <ContactPage
                    setPageIndexName={setPageIndexName}
                    data={ContactPageProps}
                />
            )}
            {pageIndexName !== "chats" && (
                <>
                    <Header className="flex flexBetween">
                        <span onClick={onBack} className="icon">
                            <IoArrowBackOutline className="n flex flexCenter" />
                        </span>
                        <h3>{pageIndexName}</h3>
                        <span className="icon" style={{ visibility: "hidden" }}>
                            <IoArrowBackOutline className="n flex flexCenter" />
                        </span>
                    </Header>
                    <OtherPagesContainer>
                        {pageIndexName.startsWith("Settings") && (
                            <Settings
                                route={pageIndexName}
                                updateRoute={onRouteUpdate}
                            />
                        )}

                        {pageIndexName.startsWith("Devices") && <Devices />}
                        {!pageIndexName.startsWith("Devices") &&
                            !pageIndexName.startsWith("Settings") && (
                                <Profile />
                            )}
                    </OtherPagesContainer>
                </>
            )}
        </Container>
    );
}

interface ContactPage {
    data: ContactsPageProps;
    setPageIndexName: (data: string) => void;
}

// ! Contacts View Page (CHATS)
function ContactPage(props: ContactPage) {
    const { setChatData, _keyPress, selectedChat, setSelectedChat } =
        props.data;
    const { setPageIndexName } = props;

    const [srchView, setSrchView] = useState(false);
    const [srchText, setSrchText] = useState("");
    const [contacts, setContacts] = useState<Array<_Contact> | null>(null);
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

    return (
        <>
            <Search
                _keyPress={_keyPress}
                srchView={srchView}
                setSrchText={_setSrchText}
                setSrchView={setSrchView}
                setPageIndexName={setPageIndexName}
            />
            <UserQuery text={srchText} visible={srchView} />
            <Contacts
                selected={selectedChat}
                visible={!srchView}
                onClick={onContactClick}
                contacts={contacts}
            />
        </>
    );
}

const components = {
    Header: styled.div`
        width: 95%;
        /* border: 2px solid white; */
        /* margin: 0.7rem 0; */
        margin: 0.7rem auto;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background-color: #2e2d2d;
        > h3 {
            font-weight: bold;
            font-size: 1.2rem;
            color: #a0a0a0;
        }

        > .icon {
            font-size: 1.8rem;
            /* border: 1px solid white; */
            border-radius: 50%;
            cursor: pointer;
            transition: 0.12s all ease;
            :hover {
                background-color: #ffffff14;
            }
            > svg > path {
                color: #a0a0a0;
            }
        }
    `,
    OtherPagesContainer: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
    `,
    Container: styled.div<{ isVisible: boolean }>`
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;

        background-color: var(--bar1-bg);

        // settings for mobile
        @media screen and (max-width: 1200px) {
            width: 35%;
        }
        @media screen and (max-width: 900px) {
            width: 39%;
        }
        @media screen and (max-width: 800px) {
            width: 45%;
        }
        @media screen and (max-width: 650px) {
            width: 55%;
        }

        @media screen and (max-width: 600px) {
            display: ${(props) => (props.isVisible ? "flex" : "none")};
            width: 100%;
        }
    `,
};

export default Pages;
