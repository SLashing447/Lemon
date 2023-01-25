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

    const { Message, MessageBody, Main, Reply, Image, ImagePreveiwContainer } =
        components;

    const myUserId = "123.me";

    const { text, photoURL } = data;

    // const [menu, setViewInfoPannel] = useState(false);

    const dir =
        props.dir === undefined
            ? uid === myUserId
                ? "right"
                : "left"
            : props.dir;
    const msgKey = `${uid}-${index}-${dir}`;

    // ! some tweaks
    const ref = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [msgHeight, setMsgHeight] = useState(0);
    const [msgImageHeight, setMsgImageHeight] = useState(0);
    useLayoutEffect(() => {
        if (imageRef.current) {
            // console.log(imageRef.current.width);
            setMsgImageHeight(imageRef.current.clientWidth);
        }
        if (ref.current) setMsgHeight(ref.current.clientHeight);
    }, []);

    // console.log("msgHeight", msgHeight);
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

    const getPadding = () => {
        let t = "0.5rem";
        let r = "4.5rem";
        let b = "0.5rem";
        let l = "0.8rem";

        if (msgHeight > 100 && photoURL === undefined) {
            r = "1rem";
            b = "1.2rem";
        }
        if (photoURL !== undefined) {
            t = "0.4rem";
            r = "0.4rem";
            b = "0.4rem";
            l = "0.4rem";
        }
        if (photoURL !== undefined && text !== "") {
            r = "0.6rem";
            b = "1.5rem";
        }
        return `${t} ${r} ${b} ${l}`;
    };

    // const getRefinedText = () => {
    //     if(spoiler)

    // };

    const getImage = () => {
        if (photoURL !== undefined && text.trim() !== "") {
            if (text.length < 100) {
                return <Image loading="lazy" src={photoURL} />;
            } else {
                return (
                    <ImagePreveiwContainer>
                        <img loading="lazy" src={photoURL} alt="" />
                        <div className="data flex col">
                            <div className="image-name">Sample_Img.jpg</div>
                            <div className="image-size">100 kb</div>
                        </div>
                    </ImagePreveiwContainer>
                );
            }
        } else if (photoURL !== undefined && text.trim() === "") {
            return <Image src={photoURL} />;
        }
        return <></>;
    };

    return (
        <Message
            dir={dir}
            aria-details={pad}
            selected={menu !== null}
            onContextMenu={onContextMenu}
        >
            {menu && (
                <Menu
                    pos={menu}
                    forMobile={true}
                    align="left"
                    animationOrigin="top left"
                    kill={onMenuKill}
                    position="fixed"
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
            <Main dir={dir} className="flex col">
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
                    padding={getPadding()} // IDK but it works this way
                    uiData={pad}
                    style={msgImageHeight ? { width: msgImageHeight } : {}}
                    tabIndex={0}
                    className={
                        photoURL !== undefined ? "flex flexCenter col" : ""
                    }
                >
                    {isSpoiler && (
                        <span className={`spoiler flex flexCenter`} />
                    )}
                    {getImage()}
                    <p>{isSpoiler ? "You dont Want to know this :D" : text}</p>

                    <span
                        className={`time${
                            photoURL !== undefined ? " photo" : ""
                        }`}
                        style={{
                            color: "white",
                        }}
                    >
                        {time}
                    </span>
                </MessageBody>
            </Main>
        </Message>
    );
}

const components = {
    ImagePreveiwContainer: styled.div`
        /* border: 1px solid white; */
        border-radius: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.25rem 1rem;
        gap: 0.51rem;
        box-shadow: inset 0 0 0.1rem black;

        > div.data {
            justify-content: center;
            width: 100%;
            /* color: red; */
            /* border: 1px solid lime; */
            > div.image-name {
                font-weight: bold;
                font-size: 1.1rem;
            }
        }

        > img {
            width: 10%;
            border: 2px solid grey;
            border-radius: 5px;
        }
    `,
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
        border-radius: 7px;
    `,

    Message: styled.div<{
        dir: "right" | "left";
        selected?: boolean;
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
        padding: string;
    }>`
        position: relative;
        /* border: 2px solid white; */
        transition: 0.14s all ease;
        :focus-within {
            scale: 1.0000001;
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
            width: 100%;
            color: ${(props) => (props.spoiler ? "grey" : "")};
        }

        > span.time {
            position: absolute;
            font-size: 0.81rem;
            mix-blend-mode: difference;
            bottom: 2px;
            right: 7px;
        }
        > span.photo.time {
            /* color: black; */
            bottom: 6px;
            right: 10px;
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
        padding: ${(props) => props.padding};
    `,
};
export default Speech;
