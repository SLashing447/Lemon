import React, { useState } from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import ChatBackground from "../addons/ChatBackground";
import Profile from "../Pages/Profile/Profile";
import Input from "./Input/Input";
import Nav from "./Nav/Nav";
import Screen from "./Screen/Screen";

interface props {
    data: _Contact | null;
    _keyPress: string | null;
    isVisible: boolean;
    onChatExit: () => void;
}

function Chat(props: props) {
    const { Container, NoChat, Main } = components;
    const { data, _keyPress, isVisible, onChatExit } = props;
    const dbId = data?.userID; // db Id
    const [shrink, setShrink] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const onShrikChat = () => {
        setShrink(true);
        setShowProfile(true);
    };
    const onExpandChat = () => {
        setShrink(false);
        setShowProfile(false);
    };

    return (
        <>
            {" "}
            <Container className="flex" isVisible={isVisible}>
                {data === null ? (
                    <NoChat className="flex flexCenter col">
                        <h1>Welcome 👋</h1>
                        <h2>Select a Chat to Start Chatting</h2>
                    </NoChat>
                ) : (
                    <>
                        <Main shrink={shrink}>
                            <ChatBackground />
                            <Nav
                                onClick={onShrikChat}
                                onExit={onChatExit}
                                data={data}
                            />
                            <Screen />
                            <Input _keyPress={_keyPress} />
                        </Main>
                        {showProfile && (
                            <Profile onExit={onExpandChat} type="chat" />
                        )}
                    </>
                )}{" "}
            </Container>{" "}
        </>
    );
}

const components = {
    Container: styled.div<{ isVisible: boolean }>`
        width: 75%;
        height: 100%;
        background-color: var(--bar2-bg);

        /* :hover {
            width: ;
        } */

        @keyframes showChatAnim {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @media screen and (max-width: 600px) {
            width: 100%;
            display: ${(props) => (props.isVisible ? "flex" : "none")};
            animation: showChatAnim 0.156s linear;
        }
    `,
    Main: styled.div<{ shrink: boolean }>`
        transition: 0.16s all ease;
        width: ${(props) => (props.shrink ? "73%" : "100%")};
        @media screen and (max-width: 1600px) {
            width: ${(props) => (props.shrink ? "67%" : "100%")};
        }
        @media screen and (max-width: 1200px) {
            width: ${(props) => (props.shrink ? "61%" : "100%")};
        }
        @media screen and (max-width: 1201px) {
            width: 100%;
        }

        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    `,
    NoChat: styled.div`
        width: 100%;
        height: 100%;
    `,
};

export default Chat;
