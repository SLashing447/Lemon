import React from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import ChatBackground from "../addons/ChatBackground";
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

    return (
        <Container isVisible={isVisible}>
            {data === null ? (
                <NoChat className="flex flexCenter col">
                    <h1>Welcome 👋</h1>
                    <h2>Select a Chat to Start Chatting</h2>
                </NoChat>
            ) : (
                <Main>
                    <ChatBackground />
                    <Nav onExit={onChatExit} data={data} />
                    <Screen />
                    <Input _keyPress={_keyPress} />
                </Main>
            )}
        </Container>
    );
}

const components = {
    Container: styled.div<{ isVisible: boolean }>`
        width: 75%;
        height: 100%;
        background-color: var(--bar2-bg);

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
    Main: styled.div`
        width: 100%;
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
