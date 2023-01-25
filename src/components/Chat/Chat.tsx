import React, { useEffect, useState } from "react";
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
    const dbId = data?.UID; // db search id for the msgs folder or somehting else idk
    const [shrink, setShrink] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [isNavMenuOpen, setNavMenuOpen] = useState(false);

    // if the user is typing
    const [isTyping, setIsTyping] = useState(false);

    const Receiver = "Rain Wilson";

    // reply state
    const [reply, setReply] = useState<{
        text: string;
        dir: "left" | "right";
    } | null>(null);

    const onShrinkChat = () => {
        setShrink(true);
        setShowProfile(true);
    };
    const onExpandChat = () => {
        setShrink(false);
        setShowProfile(false);
    };

    useEffect(() => {
        onKeyPress(_keyPress);
    }, [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (key === "Escape") {
            if (isNavMenuOpen) {
                setNavMenuOpen(false);
                return;
            }
            if (reply) {
                setReply(null);
                return;
            }
            if (shrink) {
                onExpandChat();
                return;
            }
            onChatExit();
        }
    };

    const onMessage = (data: any) => {
        console.log(data);
    };

    const onReply = (data: { text: string; dir: "left" | "right" }) => {
        setReply(data);
    };
    const onDeselectReply = () => {};

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
                                setNavMenuOpen={() => setNavMenuOpen(true)}
                                isNavMenuOpen={isNavMenuOpen}
                                onClick={onShrinkChat}
                                onExit={onChatExit}
                                data={data}
                                isTyping={isTyping}
                            />
                            <Screen onMsg={onMessage} onReply={onReply} />
                            <Input
                                ReceiverUsername={Receiver}
                                setIsTyping={setIsTyping}
                                onDeselectReply={onDeselectReply}
                                reply={reply}
                                onSend={onMessage}
                                killReply={() => setReply(null)}
                                _keyPress={_keyPress}
                            />
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
