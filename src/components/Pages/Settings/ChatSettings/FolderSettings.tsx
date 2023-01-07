import React from "react";
import { BsFillChatLeftTextFill } from "react-icons/Bs";
import styled from "styled-components";
import { components } from "../Settings";

function FolderSettings() {
    const { ExistingFolder, NewFolder, Icon, Text } = Components;

    return (
        <components.Container className="flex col" style={{ gap: "1rem" }}>
            <ExistingFolder>
                <Icon className="icon">
                    <BsFillChatLeftTextFill />
                </Icon>
                <Text className="text">All Chats</Text>
            </ExistingFolder>
            <NewFolder>
                <Text>New Folder</Text>
            </NewFolder>
        </components.Container>
    );
}

const Components = {
    ExistingFolder: styled.div`
        display: flex;
        /* border: 1px solid white; */
        border-radius: 7px;
        gap: 1rem;
        padding: 0.7rem 1.5rem;
        cursor: pointer;
        background-color: var(--bg-col);
        border: 2px solid #ffffff10;
        :hover {
            background-color: #ffffff10;
        }
    `,
    NewFolder: styled.div`
        border: 2px dashed var(--bg-accent);
        border-radius: 7px;
        cursor: pointer;
        padding: 0.7rem 1.5rem;
        :hover {
            background-color: #2a2a2a42;
        }
    `,
    Text: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
        color: #939090;
    `,
    Icon: styled.div`
        font-size: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        > svg > path {
            color: #939090;
        }
    `,
};

export default FolderSettings;
