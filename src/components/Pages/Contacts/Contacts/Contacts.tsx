import React, { useState } from "react";
import styled from "styled-components";
import { ChatData } from "../../../../types/Chat";
import _Contact from "../../../../types/_Contact";
import Selector from "./Selector/Selector";

interface Contacts {
    onClick: (data: ChatData) => void;
    contacts: Array<_Contact> | null;
}

function Contacts(props: Contacts) {
    const { Container } = components;
    const { contacts, onClick } = props;
    const [selected, setSelected] = useState(-1);

    const onSelectorClick = (index: number) => {
        setSelected(index);
    };

    return (
        <Container className="flex col">
            {contacts ? (
                contacts.map((data, index) => (
                    <Selector
                        onClick={onSelectorClick}
                        selected={selected === index}
                        index={index}
                        key={index}
                        data={data}
                    />
                ))
            ) : (
                <></>
            )}
        </Container>
    );
}

const components = {
    Container: styled.div`
        overflow: auto;
        gap: 0.15rem;
        padding: 0.7rem 0;
    `,
};

export default Contacts;
