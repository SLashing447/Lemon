import React, { useState } from "react";
import styled from "styled-components";

function ChatBackground() {
    const { Container } = components;
    // special stars and clound effect on moonLight theme
    const theme = localStorage.getItem("lemon-web-theme");
    const [text, setText] = useState("");

    return (
        <Container
            style={
                theme === "m-light"
                    ? { background: "transparent", opacity: 1 }
                    : {}
            }
        >
            {theme === "m-light" && (
                <>
                    <div className="stars"></div>
                    <div className="twinkling"></div>
                    {/* <div className="clouds"></div> */}
                </>
            )}
        </Container>
    );
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
