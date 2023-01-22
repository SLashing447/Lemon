import { useRef, useState } from "react";
import styled from "styled-components";
import _setTheme from "../../../../theme/setTheme";
import createRipple from "../../../Generic/createRipple/createRipple";
import { components } from "../Settings";

function DefaultThemes() {
    const { ThemeCard } = Components;
    const [theme, setTheme] = useState<string>("dark");
    const { Container } = components; // settings default
    const [selRadio, setSelRadio] = useState("");
    const RadioRef = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
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
        <Container style={{ gap: "1rem" }} className="flex col">
            {" "}
            <h2 style={{ margin: "0 1rem" }}>Applied Theme : {theme}</h2>
            <ThemeCard
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
                onClick={(e) => onClick(e, "light", 1)}
                className={"light-th-btn"}
            >
                {" "}
                <input
                    id="light-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[1]}
                />
                Light
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "green", 2)}
                className={"green-th-btn"}
            >
                {" "}
                <input
                    name="theme"
                    id="green-ts"
                    type="radio"
                    ref={RadioRef[2]}
                />
                Green
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "blue", 3)}
                className={"blue-th-btn"}
            >
                {" "}
                <input
                    id="blue-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[3]}
                />
                Blue
            </ThemeCard>
            <ThemeCard
                onClick={(e) => onClick(e, "m-light", 4)}
                className={"moonlight-th-btn"}
            >
                <input
                    id="m-light-ts"
                    name="theme"
                    type="radio"
                    ref={RadioRef[4]}
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
