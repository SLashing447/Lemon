import React from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import Input from "./Input/Input";
import Nav from "./Nav/Nav";
import Screen from "./Screen/Screen";

interface props {
    data: _Contact | null;
    _keyPress: string | null;
}

function Chat(props: props) {
    const { Container, NoChat, Main } = components;
    const { data, _keyPress } = props;
    const dbId = data?.userID; // db Id

    return (
        <Container>
            {data === null ? (
                <NoChat className="flex flexCenter col">
                    <h1>Welcome 👋</h1>
                    <h2>Select a Chat to Start Chatting</h2>
                </NoChat>
            ) : (
                <Main>
                    <Nav data={data} />
                    <Screen />
                    <Input _keyPress={_keyPress} />
                </Main>
            )}
        </Container>
    );
}

const components = {
    Container: styled.div`
        width: 75%;
        height: 100%;
        background-color: var(--bar2-bg);
    `,
    Main: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        /* background-image: url("https://assets.codepen.io/4787486/night-stars.jpg");
        background-size: contain;
        background-position: center;
        background-repeat: repeat; */
    `,
    NoChat: styled.div`
        width: 100%;
        height: 100%;
    `,
};

export default Chat;
