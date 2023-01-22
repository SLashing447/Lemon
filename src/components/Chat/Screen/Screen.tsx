import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getMessages from "../../../Fetch/Messages";
import _Message from "../../../types/_Message";
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
}

function Screen(props: props) {
    const { Container, Main, DateTime } = components;
    const { messages } = useMessages();
    const { onReply } = props;
    const [disableScrl, setDisableScrl] = useState(false); // disable scroll for speech menu

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

    return (
        <Container disableScroll={disableScrl} className="flex flexCenter">
            <Main onContextMenu={(e) => e.preventDefault()} tabIndex={-1}>
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
            </Main>
        </Container>
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
