import { useState, useEffect } from "react";
import styled from "styled-components";

interface props {
    text: string;
    setTextFilter: (val: string) => void;
    showIntel: boolean;
    setShowIntel: (val: boolean) => void;
    _keyPress: string | null;
    isGrp: boolean; // grp settings for input
}

const commands = [
    "spoiler",
    "nsfw",
    "disappear",
    "placeholder",
    "info4",
    "info5",
];

function Intel(props: props) {
    const [filteredCommands, setFilteredCommands] = useState<Array<string>>([]);

    const { Intel } = components;
    const { text, setTextFilter, showIntel, setShowIntel, _keyPress, isGrp } =
        props;
    // isGrp is the setting for grp Textcommand

    const [selCmd, setSelCmd] = useState(0);

    // ! keyPress observer
    useEffect(() => _keyPressHandler(), [_keyPress]);

    const _keyPressHandler = () => {
        if (!showIntel) return;

        if (_keyPress !== null) {
            // movibility
            if (
                _keyPress === "ArrowDown" &&
                selCmd !== filteredCommands.length - 1
            ) {
                setSelCmd(selCmd + 1);
            }
            if (_keyPress === "ArrowUp" && selCmd !== 0) {
                setSelCmd(selCmd - 1);
            }

            // autocomplete on space or tab
            if (_keyPress === "Tab" || _keyPress === "Enter") {
                sendAddon(filteredCommands[selCmd]);
            }

            if (
                _keyPress === " " &&
                commands.includes(text.toLowerCase().replace("/", ""))
            ) {
                // setTextFilter(text);

                // ? manual Type
                console.log("Here ", text);
                setTextFilter(text.replace("/", ""));
            }
        }
    };

    // ! tweaks for intel box
    // ! text observer for intel
    useEffect(() => {
        _commandsVisibilityLogic();
        return () => {};
    }, [text]);

    // determines weather to display the intel based on text
    const _commandsVisibilityLogic = () => {
        if (text !== null) {
            if (text.includes(" ")) {
                setVisibility(false);
            } else if (text.startsWith("/") && text.includes("/")) {
                setVisibility(true);
                displayData();
            } else {
                setVisibility(false);
            }
        }
    };

    const [intelShowAnim, setIntelShowAnim] = useState(
        "showIntelAnim 0.18s linear"
    );

    const setVisibility = (val: boolean) => {
        setIntelShowAnim(
            `${val ? "showIntelAnim" : "hideIntelAnim"} 0.1s linear`
        );
        setTimeout(() => setShowIntel(val), 90);
    };

    const displayData = () => {
        const Filter = commands.filter((val) => {
            return val
                .toLowerCase()
                .includes(text.toLowerCase().replace("/", ""));
        });

        // another tweak ,
        if (Filter.length === 1) setSelCmd(0);

        setFilteredCommands(Filter);
    };

    const sendAddon = (val: string) => {
        setTextFilter(val);
        setVisibility(false);
    };

    if (showIntel && filteredCommands.length !== 0) {
        return (
            <Intel isGrp={isGrp} className="flex col" anim={intelShowAnim}>
                <h2 style={{ marginBottom: "0.25rem" }}>Text Commands</h2>
                {filteredCommands.map((val, index) => {
                    return (
                        <div
                            key={index}
                            className={index === selCmd ? "sel" : ""}
                            onClick={() => sendAddon(val)}
                        >
                            <h3 className="text">{val}</h3>

                            {index === selCmd && (
                                <span>
                                    <h4>TAB</h4>
                                </span>
                            )}
                        </div>
                    );
                })}
            </Intel>
        );
    } else {
        return <></>;
    }
}

const components = {
    Intel: styled.div<{ anim: string; isGrp: boolean }>`
        width: 68%;

        @media screen and (max-width: 600px) {
            width: 89%;
        }
        position: absolute;
        z-index: 10;

        bottom: 75px;
        /* height: 1rem; */
        border-radius: 10px;
        box-shadow: 0 0 0.1rem black;
        background-color: rgba(36, 36, 36, 0.25);
        backdrop-filter: blur(2px);
        animation: ${(props) => props.anim};
        padding: 0.7rem 1.2rem;
        /* border: 2px solid var(--bg-p2); */
        background-color: #1b1b1b;
        border: 2px solid #373636;

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
        user-select: none;
        > div.sel {
            background-color: #ffffff12;
        }
        > div.sel > h3 {
            color: #cccccc;
        }
        > div {
            > h3 {
                color: #949494;
            }

            cursor: pointer;
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            :active {
                /* scale: 1.1; */
            }
            > span {
                background-color: #464646;
                padding: 0 0.5rem;
                border-radius: 4px;
                border-bottom: 3px solid #5f5f5f;
            }
            > h3.text::before {
                content: "/";
                margin-right: 0.1rem;
                color: #a7a6a6;
            }

            :hover > h3 {
                color: #cccccc;
            }

            :hover {
                background-color: #ffffff12;
            }
            /* border: 1px solid red; */
            padding: 0.15rem 1rem;
            border-radius: 7px;
        }
    `,
};

export default Intel;
