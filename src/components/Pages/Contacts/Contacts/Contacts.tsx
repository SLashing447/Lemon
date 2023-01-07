import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import _Contact from "../../../../types/_Contact";
import Selector from "./Selector/Selector";

interface Contacts {
    onClick: (data: _Contact, index: number) => void;

    visible: boolean;
    selected: number;
    contacts: Array<_Contact> | null;
}

function Contacts(props: Contacts) {
    const { Container } = components;
    const { contacts, onClick, visible, selected } = props;
    // const [selected, setSelected] = useState(-1);

    const onSelectorClick = (index: number) => {
        // setSelected(index);
        if (contacts !== null) {
            onClick(contacts[index], index);
        }
    };

    return (
        <Container
            onContextMenu={(e) => e.preventDefault()}
            visible={visible}
            className="flex col"
        >
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
    Container: styled.div<{ visible: boolean }>`
        /* overflow: hidden; */
        /* overflow-y: auto; */
        gap: 0.15rem;
        width: 100%;
        overflow: auto;
        /* max-height: 90%; */
        scrollbar-width: none;
        padding: 0.7rem 0;
        display: ${(props) => (props.visible ? "flex" : "none")};
    `,
};

export default Contacts;
