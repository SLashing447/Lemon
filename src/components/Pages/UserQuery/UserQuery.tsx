import React from "react";
import styled from "styled-components";

interface UserQuery {
    visible: boolean;
    text: string;
}

function UserQuery(props: UserQuery) {
    const { Container, ICard } = components;
    const { text, visible } = props;

    return (
        <Container visible={visible}>
            <ICard>Search User by thier username</ICard>
        </Container>
    );
}
const components = {
    Container: styled.div<{ visible: boolean }>`
        overflow: auto;
        gap: 0.15rem;
        scrollbar-width: none;
        /* border: 1px solid white; */
        overflow: auto;
        padding: 0.7rem 0;
        display: ${(props) => (props.visible ? "flex" : "none")};
    `,
    ICard: styled.div`
        width: 100%;
        text-align: center;
        margin: 0 2rem;
        border-radius: 7px;
        padding: 0.45rem;
        background-color: var(--primary-bg-1);
    `,
};

export default UserQuery;
