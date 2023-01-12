import { useRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import styled from "styled-components";
import createRipple from "../../components/Generic/createRipple/createRipple";

export function SignIn() {
    const { Button, Header, Input, Inp } = components;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const inpRefs = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const onClick = (e: any) => {
        createRipple(e);
    };

    return (
        <>
            <Header>
                <h1>Login</h1>
            </Header>
            <Input
                onFocus={() => inpRefs[0].current?.focus()}
                className="flex"
                tabIndex={0}
            >
                <span className="icon flex flexCenter">
                    <MdOutlineAlternateEmail />
                </span>
                <Inp
                    placeholder="email or username"
                    ref={inpRefs[0]}
                    tabIndex={-1}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                />
            </Input>
            <Input
                onFocus={() => inpRefs[1].current?.focus()}
                className="flex"
                tabIndex={0}
            >
                <span className="icon flex flexCenter">
                    <RiLockPasswordFill />
                </span>
                <Inp
                    placeholder="Password"
                    ref={inpRefs[1]}
                    tabIndex={-1}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />{" "}
                {password && (
                    <span className="interactive icon flex flexCenter">
                        <FaEyeSlash />
                    </span>
                )}
            </Input>
            <Button tabIndex={0} onClick={onClick}>
                Login
            </Button>
        </>
    );
}

const components = {
    Input: styled.div`
        /* border: 2px solid white; */
        /* background-color: red; */

        border-radius: 7px;
        position: relative;
        transition: 0.13s all ease;
        outline: none !important;
        width: 250px;
        background-color: #2d2d2d;
        padding: 0 1rem;

        > .icon.interactive {
            cursor: pointer;
            position: relative;
            /* overflow: hidden;/ */
            /* background-color: red; */
            /* border: 2px solid grey; */
            border-radius: 50%;
            padding: 0 0.66rem;
        }
        :focus-within {
            background-color: #393939;
        }

        > .icon {
            font-size: 1.2rem;
            /* > svg > path {
                color: #434343;
            } */
        }
    `,
    Inp: styled.input`
        border-radius: 7px;
        padding: 0.7rem 0.9rem;
        width: 100%;
        /* border: 1px solid blue; */
        border: none !important;
        background-color: transparent;
        outline: none !important;
    `,
    Button: styled.div`
        width: 250px;
        padding: 0.59rem 1rem;
        background-color: ${(props) =>
            props["aria-details"] === "google" ? "" : "var(--bg-accent)"};
        /* border: ${(props) =>
            props["aria-details"] === "google" ? "2px solid blue" : "none"}; */
        transition: 0.1s all ease;
        outline: none !important;
        border-radius: 7px;
        cursor: pointer;
        overflow: hidden;
        text-align: center;
        position: relative;
        :active {
            /* transform: translateY(3px); */

            /* scale: */
        }
        :focus-within {
            /* background-color: var(--msg-spch-right-h); */
        }
        gap: 0.2rem;
        > .icon {
            font-size: 2rem;
            /* > svg > path {
                color: #434343;
            } */
        }
    `,
    Header: styled.div`
        text-align: center;
        margin-bottom: 1rem;
    `,
};
export const AccountUi = components;
