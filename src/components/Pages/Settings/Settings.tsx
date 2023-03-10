import React, { useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/Bs";
import { FaPaintBrush } from "react-icons/fa";
import { RiChatSettingsFill, RiUserSettingsFill } from "react-icons/ri";
import styled from "styled-components";
import ChatSettings from "./ChatSettings/ChatSettings";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import ThemeSettings from "./ThemeSettings/ThemeSettings";

interface Props {
    setRoute: (newRoute: string) => void;
    route: string;
}

function Settings(props: Props) {
    const { Container, Card } = components;
    const { setRoute } = props;

    const go = (i: string) => {
        setRoute(i);
    };
    const IconFontSize = "1.36rem";

    return (
        <Container className="flex col fade-in-animation">
            <>
                <Card onClick={() => go("Profile")} interactice>
                    <h3 style={{ gap: "1rem" }} className="flex">
                        <span
                            style={{ fontSize: IconFontSize }}
                            className="icon flex flexCenter"
                        >
                            <RiUserSettingsFill />
                        </span>{" "}
                        <span className="icon flex flexCenter">
                            {" "}
                            Profile Settings
                        </span>
                    </h3>
                </Card>{" "}
                <Card onClick={() => go("Chat")} interactice>
                    <h3 style={{ gap: "1rem" }} className="flex">
                        <span
                            style={{ fontSize: IconFontSize }}
                            className="icon flex flexCenter"
                        >
                            <RiChatSettingsFill />
                        </span>{" "}
                        <span className="text flex flexCenter">
                            {" "}
                            Chat Settings
                        </span>{" "}
                    </h3>
                </Card>
                <Card onClick={() => go("Theme")} interactice>
                    <h3 className="flex" style={{ gap: "1rem" }}>
                        {" "}
                        <span
                            style={{ fontSize: IconFontSize }}
                            className="icon flex flexCenter"
                        >
                            <FaPaintBrush />
                        </span>
                        <span className="text flex flexCenter"> Themes</span>
                    </h3>
                </Card>
            </>
        </Container>
    );

    // if there is subroutes inside any of these routes
    // then use include method else endsWith method
}

const components = {
    Container: styled.div`
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        gap: 0.7rem;
    `,
    Card: styled.div<{ interactice?: boolean }>`
        background-color: var(--primary-bg-1);
        width: 100%;
        border-radius: 7px;
        display: flex;
        /* justify-content: center; */
        align-items: center;
        padding: 0.75rem 2rem;
        cursor: ${(props) => (props.interactice ? "pointer" : "default")};

        > span.icon {
            font-size: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        :hover {
            background-color: ${(props) =>
                props.interactice
                    ? "var(--primary-bg-1-h);"
                    : "var(--primary-bg-1);"};
        }
    `,
};

export { Settings, components };
