import React, { useRef } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";

interface Search {
    setSrchView: (val: boolean) => void;
}

function Search(props: Search) {
    const { setSrchView } = props;
    const { Container, Input } = components;
    const inpRef = useRef<HTMLInputElement | null>(null);

    const onFocus = () => {
        inpRef.current?.focus();
    };
    const onBlur = () => {};

    return (
        <Container className="flex flexCenter">
            <Input
                onBlur={onBlur}
                onBlurCapture={onBlur}
                onFocus={onFocus}
                onFocusCapture={onFocus}
                tabIndex={0}
                className="flex flexCenter"
            >
                <GoSearch size={26} className="flex flexCenter" />
                <input
                    ref={inpRef}
                    tabIndex={-1}
                    placeholder="Search"
                    type="text"
                />
            </Input>
        </Container>
    );
}
const components = {
    Container: styled.div`
        width: 100%;
        padding: 1rem;
        /* height: rem; */
        /* border: 2px solid green; */
    `,
    Input: styled.div`
        gap: 1.3rem;
        width: 100%;
        background-color: var(--srchBar-bg);
        padding: 0.9rem 2rem;
        border-radius: 100000000px;
        transition: 0.1s all ease;
        outline: none !important;
        border: none !important;

        :focus-within {
            box-shadow: inset 0 0 0 2px var(--bg-accent);
        }
        > input {
            width: 100%;
            background: transparent;
            border: none !important;
            outline: none !important;
            font-size: 1.1rem;
        }
    `,
};
export default Search;
