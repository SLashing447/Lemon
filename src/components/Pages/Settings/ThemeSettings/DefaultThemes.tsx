import { useRef, useState } from "react";
import styled from "styled-components";
import _setTheme from "../../../../theme/setTheme";
import createRipple from "../../../Generic/createRipple/createRipple";
import { components } from "../Settings";

function DefaultThemes() {
    const { ThemeCard } = Components;
    const [theme, setTheme] = useState<string | null>(
        localStorage.getItem("lemon-web-theme")
    );
    const { Container } = components; // settings default
    const [selRadio, setSelRadio] = useState("");
    const RadioRef = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const onClick = (e: any, t: string, num: number) => {
        // createRipple(e);
        setTheme(t);
        _setTheme(t);
        RadioRef[num].current?.click();
    };

    return (
        <Container
            style={{ gap: "1rem" }}
            className="flex col fade-in-animation"
        >
            <ThemeCard
                selected={theme === "dark"}
                onClick={(e) => onClick(e, "dark", 0)}
                className={"dark-th-btn"}
            >
                <input
                    id="dark-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[0]}
                />
                Dark
            </ThemeCard>
            <ThemeCard
                selected={theme === "obsidian"}
                onClick={(e) => onClick(e, "obsidian", 3)}
                className={"obi-th-btn"}
            >
                <input
                    id="blue-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[1]}
                />
                Obsidian
            </ThemeCard>
            <ThemeCard
                selected={theme === "m-light"}
                onClick={(e) => onClick(e, "m-light", 4)}
                className={"moonlight-th-btn"}
            >
                <input
                    id="m-light-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[2]}
                />
                <div className="stars"></div>
                <div className="twinkling"></div>
                {/* <div className="clouds"></div> */}
                <span className="text">Night Sky</span>
            </ThemeCard>
        </Container>
    );
}

const Components = {
    ThemeCard: styled.div<{ selected: boolean }>`
        /* border: 2px solid white; */
        padding: 0.75rem 2rem;
        /* text-align: center; */
        letter-spacing: 3px;
        text-transform: uppercase;
        > span.text {
            color: ${(props) => (props.selected ? "white" : "grey")};
        }
        color: ${(props) => (props.selected ? "white" : "grey")};
        font-size: 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        overflow: hidden;
        position: relative;
        > input[type="radio"] {
            display: none;
        }
        > div {
            border-radius: 6px;
        }
        margin: 0 1rem;
        padding: 0.75rem 2rem;
    `,
};
export default DefaultThemes;
