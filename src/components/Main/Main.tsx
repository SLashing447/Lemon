import React, { useState } from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import Chat from "../Chat/Chat";
import Pages from "../Pages/Pages";

function Main() {
    const { Container } = components;
    const [page, setPage] = useState<number>(0); // page index
    const [chatData, setChatData] = useState<ChatData | null>(null);

    // Info :
    //  This function returns two components
    //  i.e. SideBar Page and Main Chat comeponet

    const setPageIndex = (index: number) => {};

    return (
        <Container className="flex">
            <Pages
                setChatData={setChatData}
                setPageIndex={setPageIndex}
                page={page}
            />
            <Chat data={chatData} />
        </Container>
    );
}

const components = {
    Container: styled.div`
        width: 100%;
        height: 100%;
        background-color: var(--bg-col);
    `,
};

export default Main;
