import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
    MdLogout,
    MdOutlineAccountCircle,
    MdOutlineDevices,
    MdSearch,
} from "react-icons/md";
import { FiMenu, FiSettings } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/Io5";
import Menu from "../../../Generic/Menu/Menu";

const Navs = [
    {
        text: "profile",
        icon: <MdOutlineAccountCircle />,
    },
    {
        text: "Settings",
        icon: <FiSettings />,
    },
    {
        text: "Devices",
        icon: <MdOutlineDevices />,
    },
    {
        text: "Log Out",
        icon: <MdLogout />,
    },
];

interface Search {
    setSrchView: (val: boolean) => void;
    setSrchText: (val: string) => void;
    srchView: boolean;
}

function Search(props: Search) {
    const { setSrchView, setSrchText, srchView } = props;
    const { Container, Input } = components;
    const inpRef = useRef<HTMLInputElement | null>(null);
    const [text, setText] = useState("");
    const [__onFocus, set__OnFocus] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => srchViewVisibilityFromParent(), [srchView]);

    const srchViewVisibilityFromParent = () => {
        if (srchView) onFocus;
        if (!srchView) onBlur();
    };

    const onFocus = () => {
        inpRef.current?.focus();
        set__OnFocus(true);
        setSrchView(true);
    };
    const onBlur = () => {
        set__OnFocus(false);
        setSrchView(false);
        inpRef.current?.blur();
    };

    const onInputTextChange = (e: any) => {
        var text = e.target.value;
        setText(text);
        setSrchText(text);
    };

    const onIconClick = () => {
        if (!__onFocus) return;
        onBlur();
    };

    const _showMenu = () => {
        setShowMenu(true);
    };

    const IconStyle = {
        fontSize: "1.2rem",
        marginRight: "0.8rem",
    };

    return (
        <Container className="flex flexCenter">
            <span onClick={_showMenu} className="icon flex flexCenter">
                <FiMenu />
            </span>

            {showMenu && (
                <Menu
                    kill={() => setShowMenu(false)}
                    pos={{ x: 20, y: 60 }}
                    style={{ width: "9rem" }}
                    align="left"
                >
                    <>
                        {Navs.map((data, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        index === 3 ? "red " : ""
                                    }flex`}
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

            <Input
                onFocus={onFocus}
                onFocusCapture={onFocus}
                tabIndex={0}
                focus={__onFocus}
                className="flex flexCenter"
            >
                <span className="icon flex flexCenter" onClick={onIconClick}>
                    {__onFocus ? (
                        <IoArrowBackOutline className="n flex flexCenter" />
                    ) : (
                        <MdSearch className="flex flexCenter" />
                    )}
                </span>
                <input
                    onChange={onInputTextChange}
                    value={text}
                    ref={inpRef}
                    tabIndex={-1}
                    placeholder="Search"
                    type="text"
                />
            </Input>
        </Container>
    );
}
const components = {
    Container: styled.div`
        width: 100%;
        gap: 0.7rem;
        padding: 1rem;
        > .icon {
            font-size: 1.8rem;
            border-radius: 50%;
            transition: 0.14s all ease;
            /* border: 1px solid white; */
            padding: 0.35rem;
            cursor: pointer;
            :hover {
                background-color: #ffffff19;
            }
        }
        /* height: rem; */
        /* border: 2px solid green; */
    `,
    Input: styled.div<{ focus: boolean }>`
        gap: 1.3rem;
        cursor: text;
        width: 100%;
        background-color: var(--srchBar-bg);
        padding: 0.55rem 2rem;
        border-radius: 100000000px;
        transition: 0.1s all ease;
        outline: none !important;
        border: none !important;

        box-shadow: ${(props) =>
            props.focus ? "inset 0 0 0 2px var(--bg-accent)" : "none"};
        > input {
            width: 100%;
            background: transparent;
            border: none !important;
            outline: none !important;
            font-size: 1.1rem;
        }

        > .icon {
            border-radius: 50%;
            /* width: 45px;
           */
            > svg.n:hover {
                background-color: #ffffff10;
            }
            > svg {
                border-radius: 50%;
            }
            > svg > path {
                color: #a09f9f;
            }
            cursor: pointer;
            font-size: 1.8rem;

            :hover {
            }
        }
    `,
};
export default Search;
