import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import Chat from "../Chat/Chat";
import Pages from "../Pages/Pages";

function Main() {
    const { Container } = components;
    const [page, setPage] = useState<number>(0); // page index
    const [chatData, setChatData] = useState<_Contact | null>(null);
    const [_keyPress, setKeyPress] = useState<null | string>(null);

    // Info :
    //  This function returns two components
    //  i.e. SideBar Page and Main Chat comeponet

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const onKeyDown = (e: any) => {
        const key = e.key;
        setKeyPress(key);
        setTimeout(() => setKeyPress(null), 10);
    };

    const _setChatData = (data: _Contact | null) => {
        setChatData(data);
    };

    return (
        <Container className="flex">
            <Pages
                _keyPress={_keyPress}
                setChatData={_setChatData}
                page={page}
            />
            {/* Side Bar Pages */}
            <Chat _keyPress={_keyPress} data={chatData} />
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
