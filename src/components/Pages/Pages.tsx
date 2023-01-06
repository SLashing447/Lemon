import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import getContacts from "../../Fetch/Contacts";
import _Contact from "../../types/_Contact";
import Contacts from "./Contacts/Contacts/Contacts";
import Search from "./Contacts/Search/Search";
import UserQuery from "./UserQuery/UserQuery";

interface Page {
    page: number;
    _keyPress: string | null;

    setChatData: (data: _Contact | null) => void;
}

function Pages(props: Page) {
    const { page, setChatData, _keyPress } = props;
    const { Container } = components;

    if (page === 0) {
        return (
            <Container>
                <ContactPage _keyPress={_keyPress} setChatData={setChatData} />
            </Container>
        );
    }

    return <Container>Pages</Container>;
}

interface ContactPage {
    setChatData: (val: _Contact | null) => void;
    _keyPress: string | null;
}

function ContactPage(props: ContactPage) {
    const [srchView, setSrchView] = useState(false);
    const [srchText, setSrchText] = useState("");
    const [contacts, setContacts] = useState<Array<_Contact> | null>(null);
    const [selected, setSelected] = useState(false);

    const { setChatData, _keyPress } = props;

    useEffect(() => {
        console.log("Fetching contacts");
        FetchContacts();
    }, []);
    const FetchContacts = () => getContacts().then(setContacts);

    useEffect(() => onKeyPress(_keyPress), [_keyPress]);

    const onKeyPress = (key: string | null) => {
        if (key === "Escape") {
            if (srchView) {
                setSrchView(false);
                return;
            }
            setChatData(null);
            setSelected(true);
        }
    };

    const _setSrchText = (text: string) => {
        setSrchText(text);
    };
    const onContactClick = (data: _Contact) => {
        setChatData(data);
    };

    return (
        <>
            <Search
                srchView={srchView}
                setSrchText={_setSrchText}
                setSrchView={setSrchView}
            />
            <UserQuery text={srchText} visible={srchView} />
            <Contacts
                visible={!srchView}
                onClick={onContactClick}
                contacts={contacts}
            />
        </>
    );
}

const components = {
    Container: styled.div`
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;

        background-color: var(--bar1-bg);
    `,
};

export default Pages;
