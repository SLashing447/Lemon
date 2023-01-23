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
import UserQuery from "./Contacts/UserQuery/UserQuery";
import ContactPage from "./Contacts/ContactPage";
import ChatSettings from "./Settings/ChatSettings/ChatSettings";
import ThemeSettings from "./Settings/ThemeSettings/ThemeSettings";
import ProfileSettings from "./Settings/ProfileSettings/ProfileSettings";
import FolderSettings from "./Settings/ChatSettings/FolderSettings";
import DefaultThemes from "./Settings/ThemeSettings/DefaultThemes";
import Background from "./Settings/ChatSettings/Background";

export interface ContactsPageProps {
    _keyPress: string | null;
    selectedChat: number;
    setSelectedChat: (val: number) => void;
    setChatData: (data: _Contact | null) => void;
}

interface props {
    ContactPageProps: ContactsPageProps;
    isVisible: boolean;
}

export function Pages(props: props) {
    // const  = props.ContactPageProps;
    const { Container, Header, OtherPagesContainer } = components;
    const { isVisible, ContactPageProps } = props;

    // const [pageIndexName, setPageIndexName] = useState("chats");
    const [route, setRoute] = useState("chats");
    const username = "Slashing_corgi";

    const _updateRoute = (i: string) => {
        var r = route.split("/");

        if (route !== "chats" && i !== "chats") {
            setRoute(route + "/" + i);
        } else {
            setRoute(i);
        }
    };

    const previousRoute = () => {
        var r = route.split("/");

        // r is always more than equal to 2 , which is default
        if (r.length === 1) {
            setRoute("chats");
            return;
        }

        r.pop();
        let k = r.join("/");

        setRoute(k);
    };

    // ! borowing keyPress variable from the ContactPage Props
    const _keyPress = props.ContactPageProps._keyPress;
    useEffect(() => {
        if (_keyPress === "Escape") previousRoute();
    }, [_keyPress]);

    // show the header only when the Page is Not equal to Chats

    return (
        <Container isVisible={isVisible}>
            {route !== "chats" && (
                <Header className="flex flexBetween">
                    <div
                        onClick={previousRoute}
                        className="icon flex flexCenter"
                    >
                        <IoArrowBackOutline />
                    </div>
                    <h3>{route}</h3>
                    <div className="icon">
                        <IoArrowBackOutline />
                    </div>
                </Header>
            )}
            <GetPages
                route={route}
                setRoute={_updateRoute}
                contactProps={ContactPageProps}
            />
        </Container>
    );
}

interface getPageProps {
    setRoute: (data: string) => void;
    contactProps: ContactsPageProps;
    route: string;
}

function GetPages(props: getPageProps) {
    const { contactProps, setRoute, route } = props;

    // Routing
    switch (route) {
        case "chats":
            return <ContactPage setRoute={setRoute} data={contactProps} />;
        case "Settings":
            return <Settings setRoute={setRoute} route={route} />;
        case "Settings/Chat":
            return <ChatSettings setRoute={setRoute} route={route} />;
        case "Settings/Chat/Folder":
            return <FolderSettings />;
        case "Settings/Chat/Background":
            return <Background />;
        case "Settings/Theme":
            return <ThemeSettings setRoute={setRoute} route={route} />;
        case "Settings/Theme/🖼️🖼️":
            return <DefaultThemes />;
        case "Settings/Profile":
            return <ProfileSettings />;
        case "Devices":
            return <Devices />;
        case "Profile":
            return <Profile />;
        default:
            return <ContactPage setRoute={setRoute} data={contactProps} />;
    }
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
        h3 + .icon {
            visibility: hidden;
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
