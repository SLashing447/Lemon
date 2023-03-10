import React from "react";
import styled from "styled-components";
import Menu from "../../../Generic/Menu/Menu";
import { GoFile } from "react-icons/go";
import { HiPhoto, HiVideoCamera } from "react-icons/hi2";

interface props {
    kill: () => void;
}

function AttachmentMenu(props: props) {
    const { kill } = props;
    const { Container, Main } = components;

    return (
        <Container className="flex flexCenter">
            {" "}
            <Main>
                <Menu
                    pos={{ x: 0, y: 0 }}
                    animationOrigin="bottom"
                    align="left"
                    kill={kill}
                    style={{ border: "2px solid #404040" }}
                    bg={"       var(--primary-bg-1)"}
                >
                    <>
                        <li className="flex" style={{ gap: "0.8rem" }}>
                            <span
                                style={{ fontSize: "1.2rem" }}
                                className="icon flex flexCenter"
                            >
                                <GoFile />
                            </span>
                            <span className="text flex flexCenter">Files</span>
                        </li>
                        <li className="flex" style={{ gap: "0.8rem" }}>
                            {" "}
                            <span
                                style={{ fontSize: "1.2rem" }}
                                className="icon flex flexCenter"
                            >
                                <HiPhoto />
                            </span>
                            <span className="text flex flexCenter">Photos</span>{" "}
                        </li>
                        <li className="flex" style={{ gap: "0.8rem" }}>
                            <span
                                style={{ fontSize: "1.2rem" }}
                                className="icon flex flexCenter"
                            >
                                <HiVideoCamera />
                            </span>
                            <span className="text flex flexCenter">Videos</span>{" "}
                        </li>
                    </>
                </Menu>
            </Main>
        </Container>
    );
}

const components = {
    Container: styled.div`
        position: absolute;
        bottom: 110px;
        width: 100%;
        height: 95px;
        background-color: transparent;
    `,
    Main: styled.div`
        width: 70%;
        height: 100%;
        background-color: transparent;
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
};

export default AttachmentMenu;
