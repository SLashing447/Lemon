import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatSettings from "./ChatSettings/ChatSettings";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import ThemeSettings from "./ThemeSettings/ThemeSettings";

interface Props {
    updateRoute: (newRoute: string) => void;
    route: string;
}

function Settings(props: Props) {
    const { Container, Card } = components;
    const { updateRoute, route } = props;

    const go = (i: string) => {
        updateRoute(i);
    };

    return (
        <Container className="flex col">
            {route === "Settings" && (
                <>
                    <Card onClick={() => go("Chat")} interactice>
                        <h3> Chat Settings </h3>
                    </Card>
                    <Card onClick={() => go("Theme")} interactice>
                        <h3> Theme Settings</h3>
                    </Card>
                    <Card onClick={() => go("Profile")} interactice>
                        <h3> Profile Settings</h3>
                    </Card>
                </>
            )}
            {route.includes("Chat") && (
                <ChatSettings updateRoute={updateRoute} route={route} />
            )}
            {route.endsWith("Theme") && <ThemeSettings />}
            {route.endsWith("Profile") && <ProfileSettings />}
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
        background-color: #313131;
        width: 100%;
        border-radius: 7px;
        display: flex;
        /* justify-content: center; */
        align-items: center;
        padding: 1rem 2rem;
        cursor: ${(props) => (props.interactice ? "pointer" : "default")};

        :hover {
            background-color: ${(props) =>
                props.interactice ? "#3e3e3e" : "#313131"};
        }
    `,
};

export { Settings, components };
