import React, { useEffect, useRef, useState } from "react";
import { MdArrowDownward } from "react-icons/md";
import styled from "styled-components";
import getMessages from "../../../Fetch/Messages";
import _Message from "../../../types/_Message";
import { useIsVisible } from "../../hooks/useIsVisible";
import Speech from "../Speech/Speech";

function useMessages() {
    // Our data fetching state variables
    const [messages, setMessages] = useState<_Message[] | null>(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false); // A function to handle all the data fetching logic

    // 'onMount'
    // maybe load the data if required
    useEffect(() => {
        getMessages().then((data) => setMessages(data));
    }, []);

    return { messages, isLoading, error };
}

interface props {
    onReply: (data: { text: string; dir: "left" | "right" }) => void;
    onMsg: (data: any) => void;
}

function Screen(props: props) {
    const { Container, Main, DateTime, ScrollToBottomWidget } = components;
    const { messages } = useMessages();
    const { onReply, onMsg } = props;
    const [disableScrl, setDisableScrl] = useState(false); // disable scroll for speech menu

    const viewPortTop = useRef<HTMLSpanElement | null>(null);
    const viewPortBtm = useRef<HTMLSpanElement | null>(null);
    const [showScrollToBtmWidget, setShowScrollToBtmWidget] = useState(false);
    const [scrollToBtmAnim, setScrollToBtmAnim] = useState<string>("");
    const isOnBtmOfScrn = useIsVisible(viewPortBtm);

    const getSpeechPadding = (index: number, uid: string) => {
        if (!messages) return;
        if (messages[index - 1]?.uid !== uid) {
            return "F";
        } else {
            return "C";
        }
    };

    const date = new Date();
    const day = date.getDate();

    const getDateSys = (index: number) => {
        if (!messages) return;
        const _msg = messages[index];

        //  Filter by date
        const _date = [
            parseInt(messages[index - 1]?.date.split("/")[1]),
            parseInt(messages[index]?.date.split("/")[1]),
            parseInt(messages[index + 1]?.date.split("/")[1]),
        ];

        // const date = new Date;
        if (day - _date[1] === 1 && _date[1] > _date[0]) return "Yesterday";
        if (_date[1] === day && _date[1] > _date[0]) return "Today";
        if (isNaN(_date[0]) || _date[1] > _date[0]) return _msg.date;
    };

    const scrollToBottom = () => {
        setShowScrollToBtmWidget(false);

        viewPortBtm.current?.scrollIntoView({ behavior: "smooth" });
    };

    // scroll into view animation and display logics
    const handleScrollToBtmWidget = () => {
        // setShowScrollToBtmWidget(!isOnBtmOfScrn);
        if (isOnBtmOfScrn === false) {
            // console.log("here");

            setScrollToBtmAnim("scrollToBtmWigShowAnim 0.12s linear");
            setTimeout(() => setShowScrollToBtmWidget(true), 170);
        } else {
            // setShowScrollToBtmWidget(false);
            setScrollToBtmAnim("scrollToBtmWigHideAnim 0.12s linear");
            setTimeout(() => setShowScrollToBtmWidget(false), 110);
        }
    };

    useEffect(() => handleScrollToBtmWidget(), [isOnBtmOfScrn]);

    return (
        <>
            <Container disableScroll={disableScrl} className="flex flexCenter">
                <Main onContextMenu={(e) => e.preventDefault()} tabIndex={-1}>
                    <span ref={viewPortTop} className="view-port-top"></span>
                    {messages ? (
                        messages.map((data, index) => {
                            const { uid } = data;

                            const padding = getSpeechPadding(index, uid);
                            const __Date = getDateSys(index);

                            return (
                                <>
                                    {__Date && (
                                        <DateTime
                                            key={index + 69}
                                            className="flex flexCenter"
                                        >
                                            <main>{__Date}</main>
                                        </DateTime>
                                    )}

                                    <Speech
                                        onReply={onReply}
                                        key={index}
                                        index={index}
                                        setDisableScroll={setDisableScrl}
                                        msg={data}
                                        pad={padding}
                                    />
                                </>
                            );
                        })
                    ) : (
                        <>
                            {" "}
                            <div className="spinner-box">
                                <div className="three-quarter-spinner"></div>
                            </div>
                        </>
                    )}

                    <span ref={viewPortBtm} className="view-port-bottom"></span>
                </Main>{" "}
            </Container>{" "}
            {showScrollToBtmWidget && (
                <ScrollToBottomWidget
                    onClick={scrollToBottom}
                    animation={scrollToBtmAnim}
                    className="flex flexCenter"
                >
                    <MdArrowDownward />
                </ScrollToBottomWidget>
            )}
        </>
    );
}
const components = {
    Container: styled.div<{ disableScroll: boolean }>`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: ${(props) => (props.disableScroll ? "hidden" : "auto")};
        scrollbar-width: none;
        /* scrollbar-width: none; */
        /* background-color: var(--bar2-bg); */
        position: relative;
        z-index: 2;
    `,
    Main: styled.div`
        width: 65%;
        height: 100%;
        /* border: 1px solid white; */
        padding: 1rem 2rem;
        /* overflow: auto; */

        position: relative;

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
        @media screen and (max-width: 600px) {
            padding: 1rem 0.1rem;
        }
    `,
    ScrollToBottomWidget: styled.div<{ animation: string }>`
        width: 45px;
        height: 45px;

        border-radius: 50%;
        /* background-color: red; */
        background-color: var(--primary-bg-3);
        position: absolute;
        bottom: 110px;
        left: 50px;
        cursor: pointer;
        /* border: 2px solid white; */
        font-size: 1.9rem;
        z-index: 2; // ! important
        transition: 0.1345s all ease;

        // ? some resposiveness fixes
        @media screen and (max-width: 600px) {
            left: 10px;
            width: 39px;
            height: 39px;
            font-size: 1.5rem;
        }

        > svg > path {
            color: grey;
            transition: 0.1345s all ease;
        }
        :hover {
            > svg > path {
                /* color: var(--bg-accent-h); */
                color: #c2c2c2;
            }
        }

        animation: ${(props) => props.animation};
        @keyframes scrollToBtmWigShowAnim {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes scrollToBtmWigHideAnim {
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
            from {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `,

    DateTime: styled.div`
        width: 100%;
        /* border: 1px solid white; */
        padding: 0.25rem;
        position: sticky;
        top: 7px;
        z-index: 2;
        user-select: none;
        pointer-events: none;
        cursor: default;
        @keyframes DatePopAnim {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        > main {
            animation: DatePopAnim 0.2s linear;
            backdrop-filter: blur(7px);
            background-color: #3d3d3d;
            /* border: 2px solid #1c1b1bcf; */
            padding: 0.2rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
        }
    `,
};
export default Screen;
