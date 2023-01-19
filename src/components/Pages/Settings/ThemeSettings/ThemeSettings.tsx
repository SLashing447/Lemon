// import React from "react";
import styled from "styled-components";
import { components } from "../Settings";
import DefaultThemes from "./DefaultThemes";

interface Props {
    setRoute: (newRoute: string) => void;
    route: string;
}

function ThemeSettings(props: Props) {
    // const { Container } = Components;
    const { route, setRoute } = props;
    const { Card, Container } = components; // settings default

    return (
        <Container className="flex col">
            {" "}
            {route.endsWith("Theme") && (
                <Card onClick={() => setRoute("🖼️🖼️")} interactice>
                    <h3>View Themes</h3>
                </Card>
            )}
        </Container>
    );
}
const Components = {
    // Container: styled.div`
    //     height: 100%;
    //     width: 100%;
    //     gap: 0.7rem;
    // `,
};
export default ThemeSettings;
