import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import Chat from "../Chat/Chat";
import Pages from "../Pages/Pages";
import Profile from "../Pages/Profile/Profile";

function Main() {
    const { Container } = components;
    const [chatData, setChatData] = useState<_Contact | null>(null);
    const [_keyPress, setKeyPress] = useState<null | string>(null);
    const [showChatView, setShowChatView] = useState(false);
    const [selectedChat, setSelectedChat] = useState(-2);

    // Info :
    //  This function returns two components
    //  i.e. SideBar Page and Main Chat comeponet

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const onKeyDown = (e: any) => {
        const key = e.key;
        setKeyPress(key);
        setTimeout(() => setKeyPress(null), 10);
    };

    const _setChatData = (data: _Contact | null) => {
        setChatData(data);
        setShowChatView(true);
    };

    const onChatExit = () => {
        setShowChatView(false);
        setChatData(null);
        console.log("I AM HERE ");
        setSelectedChat(-1);
    };

    return (
        <Container className="flex">
            <Pages
                ContactPageProps={{
                    setSelectedChat: setSelectedChat,
                    selectedChat: selectedChat,
                    _keyPress: _keyPress,
                    setChatData: _setChatData,
                }}
                isVisible={!showChatView}
            />
            {/* Side Bar Pages */}
            <Chat
                onChatExit={onChatExit}
                isVisible={showChatView}
                _keyPress={_keyPress}
                data={chatData}
            />
        </Container>
    );
}

const components = {
    Container: styled.div`
        width: 100%;
        height: 100%;
        background-color: var(--bg-col);
    `,
};

export default Main;
