import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface props {
    sendCommand: (val: string) => void;
    kill: () => void;
    _keyPress: string | null;
    text: string;
}

interface Commands {
    header: string;
    desc: string;
}

const commands = [
    { header: "spoiler", desc: "some descrptiopsnjd qwiod hqwoidh qwoidh oi" },
    { header: "nsfw", desc: "some descrptiopsnjd qwiod hqwoidh qwoidh oi" },
    {
        header: "disappear",
        desc: "some descrptiopsnjd qwiod hqwoidh qwoidh oi",
    },
    {
        header: "placeholder",
        desc: "some descrptiopsnjd qwiod hqwoidh qwoidh oi",
    },
];

function Commands(props: props) {
    const [filteredCommands, setFilteredCommands] =
        useState<Array<Commands>>(commands);

    const { _keyPress, kill, text } = props;
    const { Container, Command, Commands } = components;
    const [animaiton, setAnimaiton] = useState("showIntelAnim 0.18s linear");
    const [focusedCommand, setFocusedCommand] = useState(0);

    // !

    // !

    useEffect(() => handleKeyPress(_keyPress), [_keyPress]);

    const handleKeyPress = (key: string | null) => {
        // navigatinf thoiurhg rthe commands using arrow ketys
        if (key === "ArrowUp") {
            setFocusedCommand(
                focusedCommand === 0 ? commands.length - 1 : focusedCommand - 1
            );
        }
        if (key === "ArrowDown") {
            setFocusedCommand(
                focusedCommand === commands.length - 1 ? 0 : focusedCommand + 1
            );
        }

        // sending command on tab
        if (key === "Tab") {
            sendCommand();
        }
    };

    useEffect(() => _commandsVisibilityLogic(text), [text]);

    const _commandsVisibilityLogic = (txt: string) => {
        if (txt === null) return;
        /**
            VISIBILITY LOGIC
            1️⃣ text must start with "/"
            2️⃣ text must not contain a space " "
            3️⃣ text must not contain any character which doesnot 
            matches the default commands
        */

        if (!txt.startsWith("/")) {
            // 1️⃣
            killCommands();
        }
        if (txt.includes(" ")) {
            // 2️⃣
            killCommands();
        }

        // 3️⃣ checks if the text has any characters as of the commands
        const Filter = commands.filter((data: Commands) => {
            const { header } = data;
            return header.includes(txt.toLowerCase().replace("/", ""));
        });

        if (Filter.length === 0) {
            killCommands(); // 3️⃣)
        } else {
            setFilteredCommands(Filter);
        }
    };

    // hovering effect on mouse hover bug fix 😎
    const onCommandHoverStart = (index: number) => {
        setFocusedCommand(index);
    };

    const sendCommand = () => {
        const cmd =
            filteredCommands.length === 1
                ? filteredCommands[0].header
                : commands[focusedCommand].header;
        props.sendCommand(cmd);
        killCommands();
        // kill the intel once the command been sent
    };

    const killCommands = () => {
        setAnimaiton("hideIntelAnim 0.18s linear");
        setTimeout(() => kill(), 170);
    };

    // FINNALY 😭😭
    // fixed this bug , took me 1 hr to fig this out
    // it returns nothing when the text doesnot matches the commands BEFORE HAND 😭😭😭😭😭
    //  I'll touch grass now
    if (
        commands.filter((data: Commands) => {
            const { header } = data;
            return header.includes(text.toLowerCase().replace("/", ""));
        }).length === 0
    ) {
        return <></>;
    }

    return (
        <Container animation={animaiton}>
            <Commands>
                {filteredCommands.map((data, index) => {
                    const { header, desc } = data;
                    return (
                        <Command
                            onMouseEnter={() => onCommandHoverStart(index)}
                            focus={index === focusedCommand}
                            key={index}
                            onClick={sendCommand}
                            className="flex flexBetween"
                        >
                            <div className="flex col">
                                <span className="text">{header}</span>
                                <span className="desc">{desc}</span>
                            </div>
                            <span className="tab">TAB</span>
                        </Command>
                    );
                })}
            </Commands>
        </Container>
    );
}

const components = {
    Container: styled.div<{ animation: string }>`
        width: 70%;
        backdrop-filter: blur(10px);
        background-color: var(--srchBar-bg);
        border: 2px solid #2c393d;

        margin-bottom: 0.5rem;

        // animation
        animation: ${(props) => props.animation};

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

        box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6);

        border-radius: 12px;
        padding: 0.2rem;

        @keyframes showIntelAnim {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes hideIntelAnim {
            to {
                opacity: 0;
                transform: translateY(10px);
            }
            from {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `,

    Commands: styled.div`
        display: flex;
        flex-direction: column;
        /* border: 1px solid white; */
        gap: 0.2rem;
    `,
    Command: styled.div<{ focus: boolean }>`
        border-radius: 6px;
        padding: 0 0.5rem;

        /* border: 1px solid white; */
        cursor: pointer;
        background-color: ${(props) => (props.focus ? "#ffffff14" : "")};
        :hover {
            background-color: #ffffff14;
        }
        > div {
            padding: 0.2rem;
        }

        > div > .text {
            font-size: 1.1rem;
            ::before {
                content: "/";
            }
        }

        > div > .desc {
            color: grey;
            font-size: 0.9rem;
        }

        :active {
            scale: 0.998;
        }

        > span.tab {
            /* border: 2px solid white; */
            display: ${(props) => (props.focus ? "flex" : "none")};
            font-size: 0.8rem;
            font-weight: bold;
            padding: 0.2rem 0.9rem;
            border-radius: 6px;
            border-bottom: 3px solid rgb(130, 130, 130);
            background-color: #464545;
        }
    `,
};

export default Commands;
