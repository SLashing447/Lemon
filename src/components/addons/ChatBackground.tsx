import React from "react";
import styled from "styled-components";

function ChatBackground() {
    const { Container } = components;

    return <Container></Container>;
}

const components = {
    Container: styled.div`
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: url("src/assets/bg/bg.png");
        opacity: 0.05;
    `,
};
export default ChatBackground;
