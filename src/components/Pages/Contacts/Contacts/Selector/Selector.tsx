import React, { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";
import { BsPinAngleFill, BsVolumeMuteFill } from "react-icons/Bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import _Contact from "../../../../../types/_Contact";
import createRipple from "../../../../Generic/createRipple/createRipple";
import Menu from "../../../../Generic/Menu/Menu";

interface selectors {
    isSelected: boolean;
    data: _Contact;
    index: number;
    onClick: (index: number) => void;
}
// MdOutlineDeleteOutline;
const Navs = [
    {
        text: "Mute Chat",
        icon: <BsVolumeMuteFill />,
    },
    {
        text: "Add to Folder",
        icon: <BiFolderPlus />,
    },
    {
        text: "Pin Chat",
        icon: <BsPinAngleFill />,
    },
    {
        text: "Delete Chat",
        icon: <MdOutlineDeleteOutline />,
    },
];

function Selector(props: selectors) {
    const { Container, Image, Data } = components;
    const { isSelected, onClick, index } = props;
    const { username, photoURL, update } = props.data;
    const [menuCords, setMenuCords] = useState<{ x: number; y: number } | null>(
        null
    );

    const onContextMenu = (e: any) => {
        e.preventDefault();
        // const bnds = e.target.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        setMenuCords({ x, y });
    };

    const IStyle = {
        fontSize: "1.3rem",
        marginRight: "1rem",
    };

    const onSelectorClick = (e: any) => {
        onClick(index);
        createRipple(e);
    };

    return (
        <>
            {" "}
            {menuCords && (
                <Menu
                    pos={{ x: menuCords.x, y: menuCords.y }}
                    kill={() => setMenuCords(null)}
                    align="left"
                    animationOrigin="top left"
                >
                    <>
                        {Navs.map((data, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`flex${
                                        index === 3 ? " red" : ""
                                    }`}
                                >
                                    <span
                                        style={IStyle}
                                        className="icon flex flexCenter"
                                    >
                                        {data.icon}
                                    </span>
                                    <span className="text">{data.text}</span>
                                </li>
                            );
                        })}
                    </>
                </Menu>
            )}
            <Container
                onContextMenu={onContextMenu}
                hover={menuCords !== null}
                onClick={onSelectorClick}
                selected={isSelected}
                title={!update ? "" : update}
            >
                <Image className="flex flexCenter">
                    <img loading="lazy" src={photoURL} />
                </Image>
                <Data className="flex col">
                    <div className="username">{username}</div>
                    {update && <div className="update">{update}</div>}
                </Data>
            </Container>
        </>
    );
}
const components = {
    Container: styled.div<{ selected: boolean; hover: boolean }>`
        display: flex;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        padding: 0.45rem 1rem;
        cursor: pointer;
        margin: 0 0.5rem;
        border-radius: 10px;
        transition: 0.2s all ease;
        /* @media screen and (max-width: 600px) {
            background-color: rgba(0, 0, 0, 0);
        } */
        background-color: ${(props) =>
            props.selected ? "var(--bg-accent)" : ""};

        box-shadow: ${(props) =>
            props.selected
                ? " 0 0 0.2rem rgba(0,0,0,0.2)"
                : "rgba(0, 0, 0, 0)"};
        ::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        animation: selShowAnim 0.2s linear;

        @keyframes selShowAnim {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        outline: none !important;
        border: none !important;

        :active {
            transform: translateY(2px);
        }

        :hover {
            background-color: ${(props) =>
                props.selected ? "var(--bg-accent)" : "var(--bg-accent-h)"};
        }
    `,
    Image: styled.div`
        > img {
            width: 53px;
            border-radius: 50%;
        }
        height: 100%;

        padding-right: 1rem;
    `,
    Data: styled.div`
        justify-content: center;
        > div.username {
            font-weight: bold;
            font-size: 1.1rem;
        }
        > div.update {
            /* font-weight: bold; */
            font-size: 0.91rem;
            color: #a8a8a8;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    `,
};

export default Selector;
