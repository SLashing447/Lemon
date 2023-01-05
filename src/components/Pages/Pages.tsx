import { useEffect, useState } from "react";
import styled from "styled-components";
import getContacts from "../../Fetch/Contacts";
import { ChatData } from "../../types/Chat";
import _Contact from "../../types/_Contact";
import Contacts from "./Contacts/Contacts/Contacts";
import Search from "./Contacts/Search/Search";

interface Page {
    page: number;
    setPageIndex: (index: number) => void;
    setChatData: (data: ChatData) => void;
}

function Pages(props: Page) {
    const { page, setPageIndex, setChatData } = props;
    const { Container } = components;

    if (page === 0) {
        return (
            <Container>
                <ContactPage />
            </Container>
        );
    }

    return <Container>Pages</Container>;
}

interface ContactPage {}

function ContactPage(props: ContactPage) {
    const onContactClick = (data: ChatData) => {};
    const [srchView, setSrchView] = useState(false);
    const [contacts, setContacts] = useState<Array<_Contact> | null>(null);

    useEffect(() => {
        console.log("Fetching contacts");
        FetchContacts();
    }, []);
    const FetchContacts = () => getContacts().then(setContacts);

    return (
        <>
            <Search setSrchView={setSrchView} />
            <Contacts onClick={onContactClick} contacts={contacts} />
        </>
    );
}

const components = {
    Container: styled.div`
        width: 25%;
        height: 100%;
        background-color: var(--bar1-bg);
    `,
};

export default Pages;
