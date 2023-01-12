import React, { useState } from "react";
import { BsHeart, BsHeartFill, BsPhone, BsTelephone } from "react-icons/Bs";
import {
    MdAlternateEmail,
    MdClose,
    MdInfo,
    MdInfoOutline,
} from "react-icons/md";
import { RiCake2Fill } from "react-icons/ri";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { TbZodiacCapricorn } from "react-icons/tb";
import styled from "styled-components";

interface props {
    type?: "chat" | "normal";
    onExit?: () => void;
}

function Profile(props: props) {
    const { type, onExit } = props;
    const {
        Container,
        MoreInfo,
        BgImage,
        Header,
        ProfileImage,
        ProfileInfo,
        Info,
        Bio,
    } = components;

    const [hasLiked, setHasLiked] = useState(false);

    const phone = "988912738";
    const email = "aishikchakraborty006@gmail.com";
    const username = "Slashing_corgi";
    const joinedSince = "Jan 16 , 2006";
    const zodiac = "Capricorn";
    const bio = " Lorem ipsum dolor sit amet conse ctetur adipisicing elit.";

    const setFav = () => {
        setHasLiked(!hasLiked);
    };

    return (
        <Container redundant={type !== "chat"}>
            {type === "chat" && (
                <Header className="flex">
                    <span onClick={onExit} className="icon flex flexCenter">
                        <MdClose />
                    </span>
                    <span className="text flex flexCenter">{username}</span>
                </Header>
            )}
            <main className="flex col">
                <ProfileImage
                    redundant={type !== "chat"}
                    className="flex flexCenter col"
                >
                    <BgImage />
                    <img
                        src="https://randomuser.me/api/portraits/men/61.jpg"
                        alt=""
                    />{" "}
                    <div className="username">Slashing Corgi</div>
                    {type === "chat" && (
                        <div onClick={setFav} className="like">
                            {!hasLiked ? <BsHeart /> : <BsHeartFill />}
                        </div>
                    )}
                </ProfileImage>
                <ProfileInfo>
                    <Info title="Phone">
                        {" "}
                        <div className="icon">
                            <BsTelephone />
                        </div>
                        <div className="cont">{phone}</div>
                    </Info>
                    <Info title="Email">
                        <div className="icon">
                            {" "}
                            <MdAlternateEmail />{" "}
                        </div>
                        <div className="cont">{email}</div>
                    </Info>
                    <Info title="Bio">
                        {" "}
                        <div className="icon">
                            <MdInfoOutline />
                        </div>
                        <div className="cont">{bio}</div>
                    </Info>
                    <Info title="My Birthday">
                        {" "}
                        <div className="icon">
                            <RiCake2Fill />
                        </div>
                        <div className="cont">{joinedSince}</div>
                    </Info>
                    <Info title="My Zodiac Sign">
                        {" "}
                        <div className="icon">
                            <TbZodiacCapricorn />
                        </div>
                        <div className="cont">{zodiac}</div>
                    </Info>
                </ProfileInfo>{" "}
                <MoreInfo className="flex col"></MoreInfo>
            </main>
        </Container>
    );
}
const components = {
    Container: styled.div<{ redundant: boolean }>`
        height: 100%;
        transition: 0.16s all ease;

        border-left: ${(props) =>
            !props.redundant ? "2px solid #3d3d3d" : "none"};

        width: ${(props) => (props.redundant ? "100%" : "27%")};

        @media screen and (max-width: 1600px) {
            width: ${(props) => (props.redundant ? "100%" : "33%")};
        }
        @media screen and (max-width: 1200px) {
            width: ${(props) => (props.redundant ? "100%" : "40%")};
        }

        @media screen and (max-width: 1201px) {
            position: ${(props) => (props.redundant ? "relative" : "absolute")};
            /* background-color: black; */
            backdrop-filter: blur(10px);
            z-index: 99;
            top: 0px;
            right: 0px;
        }

        @media screen and (max-width: 785px) {
            width: ${(props) => (props.redundant ? "100%" : "45%")};
        }
        @media screen and (max-width: 690px) {
            width: ${(props) => (props.redundant ? "100%" : "55%")};
        }
        @media screen and (max-width: 580px) {
            width: 100%;
        }

        /* border: 2px solid white; */
        display: flex;
        flex-direction: column;
        > main {
            height: 100%;
            width: 100%;

            overflow: auto;
            border-top-left-radius: ${(props) =>
                props.redundant === true ? "10px" : ""};
            border-top-right-radius: ${(props) =>
                props.redundant === true ? "10px" : ""};
        }

        /* padding: 0.6rem; */
    `,
    BgImage: styled.div`
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #60c3a920;
        /* opacity: 0.2; */
        z-index: 1;
    `,
    ProfileInfo: styled.div`
        width: 100%;

        /* border: 2px solid white; */

        display: flex;
        flex-direction: column;
    `,
    MoreInfo: styled.div`
        align-items: center;
        padding: 0.7rem 1rem;
        height: 100%;
        gap: 0.7rem;
    `,
    Info: styled.div`
        gap: 1.2rem;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 2px solid rgb(65, 65, 65);
        position: relative;
        cursor: pointer;
        background-color: #2d2d2d;
        border-radius: inherit;
        :hover {
            background-color: #383838;
        }
        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        > .icon {
            font-size: 1.7rem;
            font-weight: bold;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    `,
    Bio: styled.div`
        background-color: #3e3e3e;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 7px;
        padding: 1rem;
    `,
    ProfileImage: styled.div<{ redundant: boolean }>`
        width: 100%;
        gap: 0.45rem;
        /* height: 300px; */
        padding: 2rem 1rem;

        /* border: 2px solid white; */
        position: relative;

        ::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            /* background-color: red; */
            z-index: 9999;
            display: ${(props) => (props.redundant ? "flex" : "none")};
        }

        /* border: 2px solid white; */
        /* ::after {
            content: "Slashing Corgi";
            position: absolute;
            bottom: 0px;
            left: 0px;
        } */
        > .like {
            position: absolute;
            z-index: 2;
            top: 15px;
            right: 15px;
            cursor: pointer;
            font-size: 1.4rem;
            :hover {
                > svg > path {
                    color: red;
                }
            }
            > svg > path {
                color: #9b3030;
            }
            transition: 0.1s all ease;
            :hover {
                scale: 1.1;
            }
            :active {
                scale: 0.9;
            }
        }
        > .username {
            position: relative;
            z-index: 2;
            font-size: 1.8rem;
            margin-top: 0.2rem;
            font-weight: bold;
            color: #d0d0d0;
            text-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.46);
        }
        > img {
            width: 40%;
            position: relative;
            z-index: 2;
            /* 
            height: 100%; */
            box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.46);

            border-radius: 50%;
            aspect-ratio: 1/1;
        }
    `,
    Card: styled.div<{ imageHolder: boolean }>`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
            width: 100%;
        }
    `,
    Header: styled.div`
        width: 100%;
        background-color: var(--bar1-bg);
        /* background-color: #545454; */
        padding: 1.22rem 1rem;

        gap: 1rem;
        > .text {
            font-size: 1.3rem;
        }
        > .icon {
            font-size: 1.6rem;
            transition: 0.16s all ease;

            border-radius: 50%;
            padding: 0.3rem;
            cursor: pointer;
            :hover {
                background-color: #ffffff1a;
            }
        }
    `,
};

export default Profile;
