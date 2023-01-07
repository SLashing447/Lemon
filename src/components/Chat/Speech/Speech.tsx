import { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import _Message from "../../../types/_Message";

interface props {
    msg: _Message;
    pad: string | null | undefined;
    index: number;
}

const SEPERATOR = " -#$#%#- ";

function Speech(props: props) {
    const { msg, index } = props;
    const { time, uid, data, reply } = msg;
    const pad = props.pad || "C";

    const { Message } = components;

    const myUserId = "123.me";

    const text = data.split(SEPERATOR)[0];
    const photoURL = data.split(SEPERATOR)[1];

    const dir = uid === myUserId ? "right" : "left";
    const msgKey = `${uid}#${index}#${dir}`;

    // ! some tweaks
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    useLayoutEffect(() => {
        if (ref.current) setHeight(ref.current.clientHeight);
    }, []);

    return (
        <Message
            onContextMenu={(e) => e.preventDefault()}
            id={msgKey}
            dir={dir}
            aria-details={pad}
        >
            {/* <div className="photo"></div> */}

            <div
                ref={ref}
                tabIndex={0}
                className={`body${height > 37 ? " expand" : ""}`}
            >
                {text && <p>{text}</p>}
                <span className="time">{time}</span>
            </div>
        </Message>
    );
}

const components = {
    Message: styled.div<{ dir: "right" | "left" }>`
        width: 100%;
        position: relative;
        /* z-index: 3; */
        /* border: 2px solid white; */
        display: flex;
        position: relative;
        align-items: center;
        justify-content: ${(props) =>
            props.dir === "right" ? "end" : "start"};

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
        > .body.highlight {
            background-color: ${(props) =>
                props.dir === "left"
                    ? "var(--msg-spch-left-h)"
                    : "var(--msg-spch-right-h)"};
            ::after {
                border-top-color: ${(props) =>
                    props.dir === "left"
                        ? "var(--msg-spch-left-h)"
                        : "var(--msg-spch-right-h)"};
            }
        }
        > .body {
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

            border-radius: 12px;
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
                display: ${(props) =>
                    props["aria-details"] === "F" ? "block" : "none"};
                position: absolute;
                top: 0px;
                left: ${(props) =>
                    props["aria-details"] === "F" && props.dir === "left"
                        ? "-12px"
                        : "none"};

                right: ${(props) =>
                    props["aria-details"] === "F" && props.dir === "right"
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
            > span {
                position: absolute;
                font-size: 0.81rem;
                bottom: 2px;
                right: 7px;
            }

            padding: 0.5rem 1.35rem;
            padding-right: 5rem;
        }
        > .body.expand {
            padding-right: 1rem;
            padding-bottom: 1.35rem;
        }
    `,
};
export default Speech;
