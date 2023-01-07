import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { BiSend } from "react-icons/bi";
import Intel from "./Intel/Intel";

interface props {
    _keyPress: string | null;
}

function Input(props: props) {
    const { Container, Main, Input, Send } = components;
    const InpRef = useRef<HTMLInputElement | null>(null);
    const { _keyPress } = props;
    const [text, setText] = useState("");
    const [showCommands, setShowCommands] = useState(false);

    const onFocus = () => {
        InpRef.current?.focus();
    };

    const onTextChange = (e: any) => {
        setText(e.target.value);
    };

    useEffect(() => onKeyPress(_keyPress), [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (key === "Tab") {
        }
        if (text.startsWith("/")) {
            setShowCommands(true);
        }
    };

    const setCommand = (cmd: string) => {
        console.log(cmd);
    };

    const InputKeyPressHandler = (e: any) => {
        let key = e.key;
        if (key === "Tab") {
            e.preventDefault();
        }
    };

    return (
        <Container className="flex flexCenter" tabIndex={-1}>
            {showCommands && (
                <Intel
                    isGrp={false}
                    _keyPress={_keyPress}
                    showIntel={showCommands}
                    setShowIntel={setShowCommands}
                    text={text}
                    setTextFilter={setCommand}
                />
            )}
            <Main
                onFocus={onFocus}
                onFocusCapture={onFocus}
                className="flex"
                tabIndex={0}
            >
                <Input
                    onKeyDown={InputKeyPressHandler}
                    value={text}
                    onChange={onTextChange}
                    ref={InpRef}
                    placeholder="Message"
                    tabIndex={-1}
                />
                <Send className="flex flexCenter" tabIndex={-1}>
                    <BiSend />
                </Send>
            </Main>
        </Container>
    );
}
const components = {
    Container: styled.div`
        width: 100%;
        /* height: 100%; */
        display: flex;
        flex-direction: column;
        padding: 1rem;

        position: relative;
        z-index: 2;

        /* background-color: var(--bar1-bg); */
    `,
    Main: styled.div`
        background-color: #1b1b1b;
        width: 70%;
        padding: 0.25em 1.3rem;
        border-radius: 7px;
        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6);
        border: 2px solid #373636;

        outline: none !important;
        /* border: none !important; */

        //n mobile setiings
        @media screen and (max-width: 1200px) {
            width: 75%;
        }
        @media screen and (max-width: 950px) {
            width: 85%;
        }
        @media screen and (max-width: 700px) {
            width: 97%;
        }
    `,
    Input: styled.input`
        border: none !important;
        outline: none !important;
        background-color: transparent;
        width: 100%;
        font-size: 1.1rem;
        padding: 0.2rem;
    `,
    Send: styled.button`
        border: none !important;
        outline: none !important;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.9rem;
        border-radius: 50%;
        padding: 0.2rem;
        transition: 0.14s all ease;
        > svg > path {
            color: #858585;
        }
        :hover > svg > path {
            color: #e4e4e4;
        }
        :active {
            transform: translateX(2px);
        }
    `,
};

export default Input;
