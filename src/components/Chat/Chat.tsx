import React from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";

interface props {
    data: ChatData | null;
}

function Chat(props: props) {
    const { Container } = components;
    const { data } = props;

    return <Container>Chat</Container>;
}

const components = {
    Container: styled.div`
        width: 70%;
        height: 100%;
        background-color: var(--bar2-bg);
    `,
};

export default Chat;
