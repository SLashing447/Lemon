import { useState } from "react";
import styled from "styled-components";
import createRipple from "../../../Generic/createRipple/createRipple";
import { components } from "../Settings";

function DefaultThemes() {
    const { ThemeCard } = Components;
    const [theme, setTheme] = useState("dark");
    const { Container } = components; // settings default

    const onClick = (e: any, t: string) => {
        createRipple(e);
        setTheme(t);
    };

    return (
        <Container style={{ gap: "1rem" }} className="flex col">
            {" "}
            <ThemeCard
                onClick={(e) => onClick(e, "dark")}
                className={"dark-th-btn"}
            >
                Dark
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "light")}
                className={"light-th-btn"}
            >
                Light
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "green")}
                className={"green-th-btn"}
            >
                Green
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "blue")}
                className={"blue-th-btn"}
            >
                Blue
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "m-light")}
                className={"moonlight-th-btn"}
            >
                <div className="stars"></div>
                <div className="twinkling"></div>
                {/* <div className="clouds"></div> */}
                <span className="text">Night Sky</span>
            </ThemeCard>
        </Container>
    );
}

const Components = {
    ThemeCard: styled.div`
        /* border: 2px solid white; */
        padding: 0.75rem 2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        overflow: hidden;
        position: relative;
        > div {
            border-radius: 6px;
        }
        margin: 0 1rem;
    `,
};
export default DefaultThemes;
