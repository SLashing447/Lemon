import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import createRipple from "../components/Generic/createRipple/createRipple";
import Icon from "./Icon";
import { AccountUi, SignIn } from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

function Account() {
    const { Container, Main, Logo, Form } = components;
    const [state, setState] = useState("Sign In");
    const { Button } = AccountUi;

    const changeState = () => {
        setState(state === "Sign In" ? "Sign Up" : "Sign In");
    };

    const onUseGoogle = (e: any) => {
        createRipple(e);
    };

    return (
        <Container className="flex flexCenter">
            <Main>
                <Logo className="flex col flexCenter">
                    <img src={"src/Account/icon.png"} />
                    <div className="flex flexCenter col">
                        <div className="head">Lemon Web</div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus ipsa suscipit dicta quo sunt earum.
                        </p>
                    </div>
                </Logo>
                <Form className="flex col flexCenter">
                    {state === "Sign In" ? <SignIn /> : <SignUp />}
                    <Button
                        className="flex flexCenter"
                        aria-details="google"
                        tabIndex={0}
                        onClick={onUseGoogle}
                    >
                        <span className="icon flex flexCenter">
                            <FcGoogle />
                        </span>
                        <span className="text"> Use Google</span>
                    </Button>
                    <div className="prompt">
                        New Comers Here
                        <div onClick={changeState}>
                            {state === "Sign In" ? "Sign Up" : "Sign In"}
                        </div>
                    </div>
                </Form>
            </Main>
        </Container>
    );
}

const components = {
    Container: styled.div`
        height: 100%;
        width: 100%;

        animation: showAnim 0.2s linear;
        @keyframes showAnim {
            from {
                transform: translateY(60px);
                /* scale: 0.98; */
                opacity: 0;
            }
            to {
                transform: translateY(0);
                scale: 1;
                opacity: 1;
            }
        }
    `,
    Logo: styled.div`
        width: 400px;
        height: 400px;
        gap: 1rem;
        position: relative;
        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
        }
        > div > .head {
            font-size: 1.6rem;
        }
        > div > p {
            color: #797979;
            text-align: center;
            font-size: 0.9rem;
        }

        > img {
            width: 60%;
            @media screen and (max-width: 800px) {
                width: 55%;
            }
            user-select: none;
        }
    `,
    Form: styled.div`
        padding: 0 2rem;
        gap: 1rem;
        /* border: 1px solid white; */
        > .prompt {
            width: 100%;
            display: flex;
            gap: 0.45rem;
            justify-content: center;
            align-items: center;
            > div {
                cursor: pointer;
                position: relative;
                overflow: hidden;
                /* border: 2px solid white; */
                :active {
                    scale: 0.98;
                }
            }
        }
    `,
    Main: styled.div`
        /* background-color: #171717; */
        display: flex;
        @media screen and (max-width: 800px) {
            width: 100%;
        }

        padding: 1rem 2rem;
        border-radius: 7px;
        border: 2px solid #383838;
        box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.871);
        gap: 1rem;
    `,
};

export default Account;
