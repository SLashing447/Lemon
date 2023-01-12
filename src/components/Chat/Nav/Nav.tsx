import React, { useState } from "react";
import styled from "styled-components";
import {
    BsFillVolumeMuteFill,
    BsFlag,
    BsThreeDotsVertical,
} from "react-icons/Bs";
import { AiOutlineClear } from "react-icons/ai";
import _Contact from "../../../types/_Contact";
import Menu from "../../Generic/Menu/Menu";
import { MdBlock, MdOutlineFullscreenExit, MdReport } from "react-icons/md";
import { IoArrowBack } from "react-icons/Io5";

interface props {
    data: _Contact;
    onExit: () => void;
    onClick: () => void;
    isNavMenuOpen: boolean;
    setNavMenuOpen: () => void;
    isTyping: boolean;
}
const IconStyle = {
    fontSize: "1.2rem",
    marginRight: "0.8rem",
};
const Navs = [
    {
        text: "mute",
        icon: <BsFillVolumeMuteFill />,
    },
    {
        text: "clear chat",
        icon: <AiOutlineClear />,
    },
    {
        text: "report chat ",
        icon: <BsFlag />,
    },
    {
        text: "block user",
        icon: <MdBlock />,
    },
];

function Nav(props: props) {
    const { Container, Image, Data, Main } = components;
    const { data, onExit, onClick, isNavMenuOpen, setNavMenuOpen, isTyping } =
        props;
    const { photoURL, userID, username } = data;
    const [showMenu, setShowMenu] = useState(false);

    const IconStyle = { fontSize: "1.57rem", marginRight: "1rem" };

    return (
        <Container className="flex flexBetween">
            <span onClick={onExit} className="icon back">
                <IoArrowBack />
            </span>
            <Main onClick={onClick} className="flex">
                <Image src={photoURL} />
                <Data className="flex flexCenter">
                    {isTyping && <div className="update">Typing ... </div>}
                    <div className="username">{username}</div>
                </Data>
            </Main>
            <span
                onClick={() => {
                    setShowMenu(true);
                    setNavMenuOpen(); // for the parent chat
                }}
                className="icon"
            >
                <BsThreeDotsVertical />
            </span>
            {showMenu && isNavMenuOpen && (
                <Menu pos={{ x: 40, y: 70 }} kill={() => setShowMenu(false)}>
                    <>
                        {Navs.map((data, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`flex${
                                        index === 4
                                            ? " red"
                                            : index === 3
                                            ? " yellow"
                                            : ""
                                    }`}
                                >
                                    <span
                                        style={IconStyle}
                                        className="icon flex flexCenter"
                                    >
                                        {data.icon}
                                    </span>
                                    <span className="text flex flexCenter">
                                        {data.text}
                                    </span>
                                </li>
                            );
                        })}
                    </>
                </Menu>
            )}
        </Container>
    );
}
const components = {
    Container: styled.div`
        width: 100%;
        /* height: 100%; */
        padding: 0.7rem 2rem;
        position: relative;
        z-index: 3;

        /* flex-direction: column; */
        /* border: 1px solid white; */
        background-color: var(--bar1-bg);
        //background-color: #000000c2;

        // backdrop-filter: blur(10px);
        @media screen and (max-width: 600px) {
            padding: 0.7rem 1rem;
        }
        @media screen and (min-width: 600px) {
            > span.icon.back {
                display: none;
            }
        }

        > span.icon {
            font-size: 1.6rem;
            border-radius: 50%;
            cursor: pointer;
            padding: 0.45rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.12s all ease;
            :hover {
                background-color: #ffffff15;
            }
        }
    `,
    Main: styled.div`
        position: relative;
        cursor: pointer;
        width: 70%;
        @media screen and (max-width: 600px) {
            width: fit-content;
        }
        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
    `,
    Image: styled.img`
        width: 52px;
        border-radius: 50%;
        margin-right: 1rem;
        @media screen and (max-width: 600px) {
            width: 48px;
        }
    `,
    Data: styled.div`
        > div.username {
            font-weight: bold;
            font-size: 1.2rem;
            @media screen and (max-width: 600px) {
                font-size: 1.01rem;
            }
        }
        > div {
            font-size: 1.1rem;
        }
    `,
};
export default Nav;
