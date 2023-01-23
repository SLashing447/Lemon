import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import _Contact from "../../../../types/_Contact";
import Selector from "./Selector/Selector";

interface Contacts {
    onClick: (data: _Contact, index: number) => void;
    visible: boolean;
    selected: number;
    contacts: Array<_Contact> | null;
    contactRoute: string | null; // for folder routing , default is '/'
}

function Contacts(props: Contacts) {
    const { Container } = components;
    const { contacts, onClick, visible, selected, contactRoute } = props;
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
                contacts.map((data, index) => {
                    var parent = data.parent || "/"; // every contact has a parent route
                    // it can be base or something else

                    if (contactRoute !== parent) return;
                    // if the current route doesnot match the contact route
                    // we dont render that contact

                    return (
                        <Selector
                            onClick={onSelectorClick}
                            isSelected={selected === index}
                            index={index}
                            key={index}
                            data={data}
                        />
                    );
                })
            ) : (
                <> </>
            )}
        </Container>
    );
}

const components = {
    Container: styled.div<{ visible: boolean }>`
        gap: 0.15rem;
        width: 100%;
        overflow: auto;
        scrollbar-width: none;
        padding: 0.7rem 0;
        display: ${(props) => (props.visible ? "flex" : "none")};
    `,
};

export default Contacts;
