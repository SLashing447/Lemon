import { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import Speech from "../../Speech/Speech";
import { BsReplyAllFill } from "react-icons/Bs";
import { FcStackOfPhotos } from "react-icons/fc";
import { HiOutlinePhoto } from "react-icons/hi2";

interface props {
    data: { text: string; dir: "left" | "right" };
    ReceiverUsername: string;
    kill: () => void;
}

function Reply(props: props) {
    const { data, kill, ReceiverUsername } = props;
    const { Container, Icon } = components;
    const [anim, setAnim] = useState("showReplyAnim 0.15s linear");
    const { dir } = data;
    const text = data.text.length > 100 ? data.text.slice(0, 100) : data.text;

    const onKill = () => {
        setAnim("hideReplyAnim 0.15s linear");
        setTimeout(() => {
            kill();
        }, 140);
    };

    return (
        <Container anim={anim} className="flex flexBetween">
            {" "}
            <div className="flex">
                <Icon className="flex flexCenter">
                    <BsReplyAllFill />
                </Icon>
                <main className="flex col">
                    <div className="head">{ReceiverUsername}</div>
                    <div className="text">
                        {text === "" ? (
                            <HiOutlinePhoto className="icon" />
                        ) : (
                            text
                        )}
                    </div>
                </main>{" "}
            </div>
            <Icon
                style={{ cursor: "pointer" }}
                onClick={onKill}
                className="flex flexCenter"
            >
                <RxCross2 />
            </Icon>
        </Container>
    );
}

const components = {
    Container: styled.div<{ anim: string }>`
        width: 70%;
        animation: ${(props) => props.anim};

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

        position: absolute;
        z-index: 10;

        bottom: 63px;

        border-radius: 7px 7px 0 0;
        background-color: #1b1b1b;
        /* box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.6); */
        border: 2px solid #373636;
        border-bottom: none;
        gap: 1rem;
        padding: 0.5rem 0;

        > div > main {
            position: relative;
            cursor: pointer;

            padding: 0.2rem 1rem;
            border-radius: 0 10px 10px 0;
            padding-top: none;
            :hover {
                background-color: rgba(253, 253, 253, 0.034);
            }
            ::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            > .head {
                /* margin: 0.1rem; */
                font-weight: bold;
                /* color: var(--bg-accent); */
            }
            border-left: 3px solid #424242b8;
            padding-left: 0.5rem;

            width: 100%;
        }
        > div > main > div > .icon {
            font-size: 1.5rem;
        }
        @keyframes showReplyAnim {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes hideReplyAnim {
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
    Icon: styled.span`
        /* border: 1px solid white; */
        /* border-radius: 50%; */
        /* padding-top: 1rem; */
        font-size: 1.5rem;
        margin: 0 1rem;

        > svg > path {
            color: #aaaaaa;
        }
        /* bo */
    `,
};

export default Reply;
