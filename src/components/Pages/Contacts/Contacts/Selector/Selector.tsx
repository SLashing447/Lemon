import React from "react";
import styled from "styled-components";
import _Contact from "../../../../../types/_Contact";

interface selectors {
    selected: boolean;
    data: _Contact;
    index: number;
    onClick: (index: number) => void;
}

function Selector(props: selectors) {
    const { Container, Image, Data } = components;
    const { selected, onClick, index } = props;
    const { username, photoURL, update } = props.data;

    return (
        <Container
            tabIndex={0}
            className="flex"
            onClick={() => onClick(index)}
            selected={selected}
        >
            <Image className="flex flexCenter">
                <img src={photoURL} />
            </Image>
            <Data className="flex flexCenter">
                <div className="username">{username}</div>
                {update && <div className="update">{update}</div>}
            </Data>
        </Container>
    );
}
const components = {
    Container: styled.div<{ selected: boolean }>`
        position: relative;

        padding: 0.45rem 1rem;
        cursor: pointer;
        margin: 0 0.5rem;
        border-radius: 10px;
        transition: 0.2s all ease;
        background-color: ${(props) =>
            props.selected ? "var(--bg-accent)" : ""};

        box-shadow: ${(props) =>
            props.selected ? " 0 0 0.2rem rgba(0,0,0,0.2)" : "none"};
        ::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        outline: none !important;
        border: none !important;

        :active {
            scale: 0.995;
        }
        /* border: 2px solid white; */
        :hover,
        :focus-within {
            background-color: ${(props) =>
                props.selected ? "var(--bg-accent)" : "var(--bg-accent-h)"};
        }
    `,
    Image: styled.div`
        > img {
            width: 55px;
            border-radius: 50%;
        }
        height: 100%;

        padding-right: 1rem;
    `,
    Data: styled.div`
        > div.username {
            font-weight: bold;
            font-size: 1.3rem;
        }
    `,
};

export default Selector;
