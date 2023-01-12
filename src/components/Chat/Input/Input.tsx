import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { BiSend } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import Intel from "./Intel/Intel";
import AttachmentMenu from "./AttachmentMenu/AttachmentMenu";
import Menu from "../../Generic/Menu/Menu";
import Reply from "./Reply/Reply";

interface props {
    ReceiverUsername: string;
    _keyPress: string | null;
    setOpenTextCommand: () => void;
    isTextCommandOpen: boolean;
    reply: { text: string; dir: "left" | "right" } | null;
    onDeselectReply: () => void;
    killReply: () => void;
    setIsTyping: (val: boolean) => void;
}

function Input(props: props) {
    const { Container, Main, Input, Send, Command, CommandsContainer } =
        components;
    const InpRef = useRef<HTMLInputElement | null>(null);
    const {
        _keyPress,
        setOpenTextCommand,
        isTextCommandOpen,
        setIsTyping,
        onDeselectReply,
        reply,
        killReply,
        ReceiverUsername,
    } = props;
    const [text, setText] = useState("");
    const [showCommands, setShowCommands] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState<any>();

    const [textCommands, setTextCommands] = useState<Array<string> | null>(
        null
    );

    const onFocus = () => {
        InpRef.current?.focus();
    };

    const onTextChange = (e: any) => {
        setText(e.target.value);
    };

    useEffect(() => onKeyPress(_keyPress), [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (text.startsWith("/")) {
            setShowCommands(true);
            setOpenTextCommand(); // for the parent -> Chat
        }
    };

    const setCommand = (cmd: string) => {
        if (textCommands !== null) {
            setTextCommands([...textCommands, cmd]);
        } else {
            setTextCommands([cmd]);
        }
    };

    // TODO : FIX ALL THE COMMANDS  ORIENTED BUGSS ASAP 🙏🙏
    const checkCombination = (cmd: string) => {};

    const InputKeyPressHandler = (e: any) => {
        let key = e.key;
        if (key === "Tab" || key === "ArrowUp" || key === "ArrowDown") {
            e.preventDefault();
        }
        // removing the textCommand
        if (
            key === "Backspace" &&
            text.trim() === "" &&
            textCommands !== null
        ) {
            textCommands.pop();
            setTextCommands(textCommands);
        }
    };

    const _showAttachMentMenu = () => {
        setShowAttachmentMenu(true);
    };

    const onKillCommand = (e: string) => {};

    return (
        <Container className="flex flexCenter" tabIndex={-1}>
            <CommandsContainer>
                <main>
                    {textCommands &&
                        textCommands.map((data, index) => {
                            return (
                                <Command nsfw={data === "nsfw"} key={index}>
                                    {data}
                                </Command>
                            );
                        })}
                </main>
            </CommandsContainer>
            {showCommands && isTextCommandOpen && (
                <Intel
                    ExistingCommands={textCommands}
                    isGrp={false}
                    _keyPress={_keyPress}
                    showIntel={showCommands}
                    setShowIntel={setShowCommands}
                    text={text}
                    setTextFilter={setCommand}
                />
            )}
            {reply && (
                <Reply
                    ReceiverUsername={ReceiverUsername}
                    kill={() => killReply()}
                    data={reply}
                />
            )}
            {showAttachmentMenu && (
                <AttachmentMenu kill={() => setShowAttachmentMenu(false)} />
            )}
            <Main
                isReplyView={reply !== null}
                onFocus={onFocus}
                onFocusCapture={onFocus}
                className="flex"
                tabIndex={0}
            >
                {" "}
                <button
                    onClick={_showAttachMentMenu}
                    className="cmd-btn flex flexCenter"
                    tabIndex={-1}
                >
                    <CgAdd />
                </button>
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

    CommandsContainer: styled.div`
        position: absolute;
        bottom: 69px;
        width: 100%;
        /* background-color: red; */
        /* height: 100px; */
        display: flex;
        justify-content: center;
        align-items: center;
        > main {
            width: 68.4%;
            /* background-color: purple; */
            display: flex;
            gap: 0.5rem;
        }
    `,
    Command: styled.div<{ nsfw?: boolean }>`
        /* width: %; */
        border: 2px solid white;
        padding: 0.2rem 2rem;
        border-radius: 6px;
        position: relative;
        cursor: default;
        user-select: none;
        background-color: #1b1b1b;
        border: 2px solid
            ${(props) => (props.nsfw === true ? "#ff000089" : "#373636")};
        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6);
        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;

            width: 100%;
            height: 100%;

            background-color: ${(props) =>
                props.nsfw === true ? "#ff000032" : ""};
        }
    `,

    Main: styled.div<{ isReplyView: boolean }>`
        background-color: #1b1b1b;
        width: 70%;
        padding: 0.25em 1.3rem;

        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6);
        border: 2px solid #373636;
        border-top: ${(props) => (props.isReplyView ? "none" : "")};
        border-radius: ${(props) =>
            props.isReplyView ? "0 0 12px 12px" : "12px"};

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

        > button.cmd-btn {
            outline: none !important;

            background-color: transparent;
            font-size: 1.7rem;
            :hover {
                > svg > path {
                    color: white;
                }
            }
            > svg > path {
                color: #a4a4a4;
            }

            padding: 0 0.3rem;

            border-radius: 50%;
            margin-right: 0.3rem;
            border: none;
            cursor: pointer;
            :hover {
                background-color: #3d3d3d73;
            }
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
