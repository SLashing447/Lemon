import { useState, useRef, useLayoutEffect } from "react";
import { BsReplyAllFill } from "react-icons/Bs";
import { FcInfo } from "react-icons/fc";
import { FiCopy } from "react-icons/fi";
import { IoReturnUpForward } from "react-icons/Io5";
import { MdOutlineDelete, MdOutlineReportGmailerrorred } from "react-icons/md";
import styled from "styled-components";
import _Message from "../../../types/_Message";
import Menu from "../../Generic/Menu/Menu";

interface props {
    msg: _Message;
    pad: string | null | undefined;
    index: number;
    dir?: "left" | "right";
    isDummy?: boolean;
    setDisableScroll: (val: boolean) => void;
    onReply: ((data: { text: string; dir: "left" | "right" }) => void) | null;
}

const SEPERATOR = " -#$#%#- ";

const MenuFuncs = [
    {
        icon: <BsReplyAllFill />,
        text: "Reply",
    },
    {
        icon: <FiCopy />,
        text: "Copy Text",
    },
    {
        icon: <IoReturnUpForward />,
        text: "Foward ",
    },
    {
        icon: <MdOutlineDelete />,
        text: "Delete ",
    },
];

function Speech(props: props) {
    const { msg, index, onReply, isDummy, setDisableScroll } = props;
    const { time, uid, data, reply, spoiler } = msg;
    const pad = props.pad || "C";

    const [isSpoiler, setSpoiler] = useState(spoiler);
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

    const { Message, MessageBody, OtherInfo, Main, Reply, Image } = components;

    const myUserId = "123.me";

    const text = data.split(SEPERATOR)[0];
    const photoURL = data.split(SEPERATOR)[1];

    // const [menu, setViewInfoPannel] = useState(false);

    const dir =
        props.dir === undefined
            ? uid === myUserId
                ? "right"
                : "left"
            : props.dir;
    const msgKey = `${uid}-${index}-${dir}`;

    // ! some tweaks
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    useLayoutEffect(() => {
        if (ref.current) setHeight(ref.current.clientHeight);
    }, []);

    // ! on Msg Click
    const onMsgClick = () => {
        if (spoiler) setSpoiler(false);
    };

    const getMessageTitle = () => {
        if (spoiler) return "spoiler";
        return "";
    };

    const getDataFromReply = () => {
        if (reply === undefined) return ["", ""];
        for (let i = 0; i <= reply?.length; i++) {
            if (reply[i] === "@") {
                return [
                    reply.slice(0, i),
                    reply.slice(i + 1).length > 200
                        ? `${reply.slice(i + 1).slice(0, 200)} . . . `
                        : reply.slice(i + 1),
                ];
            }
        }
        return ["", ""];
    };

    const onReplyClick = () => {
        let x = document.getElementById("123.me-0-right");
        // console.log(x);
        x?.focus();
    };

    const onDoubleClick = () => {
        setOnReply();
    };

    const setOnReply = () => {
        if (onReply) onReply({ text: text, dir: dir });
    };

    const onContextMenu = (e: any) => {
        // const  x   = e.clientX;
        e.preventDefault();
        // const  x   = ;
        const x = e.clientX;
        const y = e.clientY;
        ref.current?.focus();
        setDisableScroll(true);
        setMenu({ x, y });
    };
    const onMenuKill = () => {
        setDisableScroll(false);
        setMenu(null);
    };

    const onMenuFunctions = (id: number) => {
        switch (id) {
            case 0:
                if (!isSpoiler) setOnReply();
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        onMenuKill();
    };

    // const getRefinedText = () => {
    //     if(spoiler)

    // };

    console.log(text, height, height > 100);

    return (
        <Message
            // onContextMenu={(e) => e.preventDefault()}
            dir={dir}
            imagePadding={photoURL !== ""}
            aria-details={pad}
            selected={menu !== null}
            onContextMenu={onContextMenu}
        >
            {" "}
            {menu && (
                <Menu
                    pos={menu}
                    // bg="red"
                    forMobile={true}
                    // animationOrigin="top right"
                    align="left"
                    animationOrigin="top left"
                    kill={onMenuKill}
                >
                    <>
                        {MenuFuncs.map((data, index) => {
                            const { text, icon } = data;
                            return (
                                <li
                                    onClick={() => onMenuFunctions(index)}
                                    className={index === 3 ? "red" : ""}
                                    key={index}
                                >
                                    <span className="icon">{icon}</span>
                                    <span className="text">{text}</span>
                                </li>
                            );
                        })}
                    </>
                </Menu>
            )}
            <Main
                dir={dir}
                // onContextMenu={onContextMenu}
                className="flex col"
            >
                {" "}
                {reply && (
                    <>
                        <Reply onClick={onReplyClick} dir={dir}>
                            <div className="name">{getDataFromReply()[0]}</div>
                            <div className="data">{getDataFromReply()[1]}</div>
                        </Reply>
                    </>
                )}
                <MessageBody
                    onDoubleClick={onDoubleClick}
                    id={msgKey}
                    title={getMessageTitle()}
                    onClick={onMsgClick}
                    ref={ref}
                    spoiler={isSpoiler}
                    dir={dir}
                    imagePadding={photoURL !== ""}
                    uiData={pad}
                    style={isDummy ? { width: "100%" } : {}}
                    tabIndex={0}
                    expandForTimeStamp={height > 100}
                    // className={`body${ ? " expand" : ""}`}
                >
                    {isSpoiler && <span className="spoiler flex flexCenter" />}
                    {text ? (
                        <p>
                            {isSpoiler ? "You dont Want to know this :D" : text}
                        </p>
                    ) : (
                        <Image draggable={false} src={photoURL} />
                    )}
                    <span className="time">{time}</span>
                </MessageBody>
            </Main>
        </Message>
    );
}

const components = {
    Reply: styled.div<{ dir: "right" | "left" }>`
        /* width: 100%; */
        /* me; border-left: 2px solid li */
        padding: 0.35rem 1.35rem;
        border-radius: 8px;
        background-color: ${(props) =>
            props.dir === "right"
                ? "var(--msg-spch-left)"
                : "var(--msg-spch-right)"};
        margin-bottom: 0.2rem;
        max-width: 50%;
        position: relative;
        cursor: pointer;
        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        > .name {
            font-weight: bold;
        }

        :hover {
            background-color: ${(props) =>
                props.dir === "right"
                    ? "var(--msg-spch-left-h)"
                    : "var(--msg-spch-right-h)"};
        }
    `,
    Image: styled.img`
        width: 100%;
    `,
    OtherInfo: styled.span`
        /* border: 1px solid white; */
        /* justify-content: left; */
        cursor: pointer;
        position: absolute;

        bottom: 0;
        right: 0;
    `,
    Message: styled.div<{
        dir: "right" | "left";
        selected?: boolean;
        imagePadding: boolean;
    }>`
        width: 100%;
        /* border: 1px solid white; */
        position: relative;
        /* z-index: 3; */
        padding: 0 1rem;
        /* border: 2px solid white; */
        border-radius: 10px;

        background-color: ${(props) => (props.selected ? "#00000025" : "")};
        /* backdrop-filter: ${(props) =>
            props.selected ? "blur(10px)" : ""}; */

        padding-top: ${(props) =>
            props["aria-details"] === "C" ? "0.15rem" : "0"};
        margin-top: ${(props) =>
            props["aria-details"] === "F" ? "1.25rem" : "0"};

        animation: showMsgAnim 0.2s linear;
        @keyframes showMsgAnim {
            from {
                opacity: 0;
                transform: translateY(+5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        /* > .body */

        /* border: 1px solid red; */

        /* border: 1px solid white; */
        /* background-color: #00000067;
        border-radius: 12px; */
    `,
    Main: styled.div<{ dir: "right" | "left" }>`
        width: 100%;
        display: flex;
        position: relative;
        align-items: ${(props) =>
            props.dir === "right" ? "flex-end" : "flex-start"};
        /* border: 1px solid lime; */

        justify-content: ${(props) =>
            props.dir === "right" ? "end" : "start"};
    `,
    MessageBody: styled.div<{
        uiData: string;
        dir: "left" | "right";
        spoiler?: boolean;
        imagePadding: boolean;
        expandForTimeStamp: boolean;
    }>`
        position: relative;
        /* border: 2px solid white; */
        transition: 0.14s all ease;
        :focus-within {
            scale: 1.01;
            background-color: ${(props) =>
                props.dir === "left"
                    ? "var(--msg-spch-left-h)"
                    : "var(--msg-spch-right-h)"};
            outline: none !important;
            border: none !important;
        }

        box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.354);

        max-width: 50%;
        @media screen and (max-width: 880px) {
            max-width: 55%;
        }
        @media screen and (max-width: 780px) {
            max-width: 70%;
        }
        @media screen and (max-width: 700px) {
            max-width: 80%;
        }

        border-radius: 8px;
        background-color: ${(props) =>
            props.dir === "left"
                ? "var(--msg-spch-left)"
                : "var(--msg-spch-right)"};

        :focus-within::after {
            border-top-color: ${(props) =>
                props.dir === "left"
                    ? "var(--msg-spch-left-h)"
                    : "var(--msg-spch-right-h)"};
        }

        ::after {
            content: "";
            transition: 0.14s all ease;
            /* box-shadow: 0 0 0.3rem black; */
            display: ${(props) => (props.uiData === "F" ? "block" : "none")};
            position: absolute;
            top: 0px;
            left: ${(props) =>
                props.uiData === "F" && props.dir === "left"
                    ? "-12px"
                    : "none"};

            right: ${(props) =>
                props.uiData === "F" && props.dir === "right"
                    ? "-12px"
                    : "none"};

            /* background-color: red; */
            border-right: 13px solid transparent;
            border-left: 13px solid transparent;
            border-bottom: 13px solid transparent;
            border-top: 13px solid
                ${(props) =>
                    props.dir === "left"
                        ? "var(--msg-spch-left)"
                        : "var(--msg-spch-right)"};

            border-radius: 7px;
        }
        > p {
            color: ${(props) => (props.spoiler ? "grey" : "")};
        }

        > span.time {
            position: absolute;
            font-size: 0.81rem;
            bottom: 2px;
            right: 7px;
        }
        > span.spoiler {
            position: absolute;
            top: 0;
            left: 0px;
            ::after {
                content: "Click to Reveal";
                text-transform: uppercase;
                font-size: 0.8rem;
                color: #b1acac;
            }

            height: 100%;
            border-radius: 16px;
            width: 100%;
            /* border: 1px solid whitesmoke; */
            z-index: 1;
            cursor: pointer;
            backdrop-filter: blur(5px);
        }

        padding-right: ${(props) =>
            props.expandForTimeStamp
                ? "1.65rem"
                : props.imagePadding
                ? "0.25rem"
                : "0.6rem"};
        padding-left: ${(props) => (props.imagePadding ? "0.25rem" : "0.6rem")};
        padding-top: 0.6rem;
        padding-bottom: ${(props) =>
            props.expandForTimeStamp
                ? "1.65rem"
                : props.imagePadding
                ? "0.25rem"
                : "0.6rem"};
    `,
};
export default Speech;
