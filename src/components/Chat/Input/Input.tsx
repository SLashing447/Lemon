import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { BiSend } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import AttachmentMenu from "./AttachmentMenu/AttachmentMenu";
import Menu from "../../Generic/Menu/Menu";
import Reply from "./Reply/Reply";
import Commands from "./Commands/Commands";

interface props {
    ReceiverUsername: string;
    _keyPress: string | null;
    onSend: (data: string) => void;
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
        onSend,
        setIsTyping,
        onDeselectReply,
        reply,
        killReply,
        ReceiverUsername,
    } = props;
    const [text, setText] = useState("");
    const [showCommands, setShowCommands] = useState(false);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    // const [searchTimeout, setSearchTimeout] = useState<any>();

    const [textCommands, setTextCommands] = useState<Array<string>>([]);

    // console.log(textCommands);

    const onFocus = () => {
        InpRef.current?.focus();
    };

    const onTextChange = (e: any) => {
        setText(e.target.value);
    };

    useEffect(() => {
        onFocus();
        onKeyPress(_keyPress);
    }, [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (text.startsWith("/")) {
            setShowCommands(true);
        }
    };

    const setCommand = (cmd: string) => {
        // checks if the command already exists or not , as simple as that
        if (textCommands?.indexOf(cmd) !== -1 && textCommands !== null) {
            return;
        }
        if (textCommands !== null) {
            setTextCommands([...textCommands, cmd]);
        } else {
            setTextCommands([cmd]);
        }

        setText("");
    };

    // TODO : FIX ALL THE COMMANDS  ORIENTED BUGSS ASAP 🙏🙏
    const checkCombination = (cmd: string) => {};

    const InputKeyPressHandler = (e: any) => {
        let key = e.key;
        if (key === "Tab" || key === "ArrowUp" || key === "ArrowDown") {
            e.preventDefault();
        }
        if (key === "Enter") {
            sendMessage();
        }

        // removing the textCommand
        if (
            key === "Backspace" &&
            text.trim() === "" &&
            textCommands !== null
        ) {
            textCommands.pop(); // removing set commands on backspace
            setTextCommands(textCommands);
        }
    };

    const _showAttachMentMenu = () => {
        setShowAttachmentMenu(true);
    };

    const sendMessage = () => {
        if (text.trim() !== "") {
            onSend(text); // -> send The Message to the parent
            setText("");
        }
    };

    return (
        <Container className="flex flexCenter" tabIndex={-1}>
            <CommandsContainer>
                <main>
                    {textCommands.map((data, index) => {
                        return (
                            <Command nsfw={data === "nsfw"} key={index}>
                                {data}
                            </Command>
                        );
                    })}
                </main>
            </CommandsContainer>
            {showCommands && (
                <Commands
                    sendCommand={setCommand}
                    _keyPress={_keyPress}
                    text={text}
                    kill={() => setShowCommands(false)}
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
                <Send
                    onClick={sendMessage}
                    className="flex flexCenter"
                    tabIndex={-1}
                >
                    <BiSend />
                    {/* <div className="load">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div> */}
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
        padding: 1rem 0;

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
            width: 70%;
            /* background-color: purple; */
            display: flex;
            gap: 0.5rem;
            /* border: 1px solid white; */
            overflow: auto;
            scrollbar-width: none;

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
        background-color: var(--primary-bg-2);
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
        background-color: var(--msg-input-bg);
        width: 70%;
        padding: 0.25em 1.3rem;

        /* box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6); */
        border: 2px solid var(--msg-input-bg-border-col);
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
